import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAllProducts, searchProducts, filterProducts, getCategories, getBrands, getConditions } from '../services/apiService';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({ category: '', brand: '', productCondition: '' });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProducts(true);
    fetchFilterData();
  }, []);

  const fetchProducts = async (reset = false) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const data = await getAllProducts(reset ? 0 : page, 10);
      setProducts(reset ? data.content : [...products, ...data.content]);
      setPage(reset ? 1 : page + 1);
      setHasMore(!data.last);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilterData = async () => {
    try {
      const categoriesData = await getCategories();
      const brandsData = await getBrands();
      const conditionsData = await getConditions();
      setCategories(categoriesData);
      setBrands(brandsData);
      setConditions(conditionsData);
    } catch (error) {
      console.error('Failed to fetch filter data:', error);
    }
  };

  const handleSearch = async () => {
    setPage(0);
    setHasMore(true);
    try {
      const data = await searchProducts(searchQuery, 0, 10);
      setProducts(data.content);
      setPage(1);
      setHasMore(!data.last);
    } catch (error) {
      console.error('Failed to search products:', error);
    }
  };

  const handleFilter = async () => {
    setPage(0);
    setHasMore(true);
    try {
      const { category, brand, productCondition } = filter;
      const data = await filterProducts(category, brand, productCondition, 0, 10);
      setProducts(data.content);
      setPage(1);
      setHasMore(!data.last);
    } catch (error) {
      console.error('Failed to filter products:', error);
    }
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setFilter({ category: '', brand: '', productCondition: '' });
    setPage(0);
    setHasMore(true);
    fetchProducts(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filter.category}
          style={styles.picker}
          onValueChange={(itemValue) => setFilter({ ...filter, category: itemValue })}
        >
          <Picker.Item label="Select Category" value="" />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
        <Picker
          selectedValue={filter.brand}
          style={styles.picker}
          onValueChange={(itemValue) => setFilter({ ...filter, brand: itemValue })}
        >
          <Picker.Item label="Select Brand" value="" />
          {brands.map((brand) => (
            <Picker.Item key={brand} label={brand} value={brand} />
          ))}
        </Picker>
        <Picker
          selectedValue={filter.productCondition}
          style={styles.picker}
          onValueChange={(itemValue) => setFilter({ ...filter, productCondition: itemValue })}
        >
          <Picker.Item label="Select Condition" value="" />
          {conditions.map((condition) => (
            <Picker.Item key={condition} label={condition} value={condition} />
          ))}
        </Picker>
        <Button title="Filter" onPress={handleFilter} />
        <Button title="Refresh" onPress={handleRefresh} /> {/* Nút refresh mới */}
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => fetchProducts()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: { padding: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  filterContainer: { marginBottom: 10 },
  picker: { height: 50, width: '100%' },
});

export default ProductList;