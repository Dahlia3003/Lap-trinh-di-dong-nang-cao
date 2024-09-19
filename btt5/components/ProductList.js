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
import { getAllProducts, searchProducts, filterProducts, getCategories, getBrands, getConditions, getTopSellingProducts } from '../services/apiService';
import ProductCard from './ProductCard';
import Header from './Header';
import Footer from './Footer';
import { FontAwesome } from '@expo/vector-icons';

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
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [topSellingPage, setTopSellingPage] = useState(0);
  const [topSellingHasMore, setTopSellingHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts(true);
    fetchFilterData();
    fetchTopSellingProducts(true);
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

  const fetchTopSellingProducts = async (reset = false) => {
    if (isLoading || !topSellingHasMore) return;
    setIsLoading(true);
    try {
      const data = await getTopSellingProducts(reset ? 0 : topSellingPage, 10);
      setTopSellingProducts(reset ? data.content : [...topSellingProducts, ...data.content]);
      setTopSellingPage(reset ? 1 : topSellingPage + 1);
      setTopSellingHasMore(!data.last);
    } catch (error) {
      console.error('Failed to fetch top selling products:', error);
    } finally {
      setIsLoading(false);
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
    fetchTopSellingProducts(true);
    handleFilter;
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <FontAwesome name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {showFilters && (
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
          <Button title="Refresh" onPress={handleRefresh} />
        </View>
      )}
      <FlatList
        data={topSellingProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        style={styles.topSellingList}
        onEndReached={() => fetchTopSellingProducts()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => fetchProducts()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  searchInput: { flex: 1, padding: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginRight: 10 },
  filterContainer: { marginBottom: 10 },
  picker: { height: 50, width: '100%' },
  topSellingList: { minHeight: 90, marginBottom: 10 },
});

export default ProductList;