import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart } from '../services/apiService'; // Import hàm thêm vào giỏ hàng

const ProductCard = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAddToCart = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        await addToCart(parsedUser.id, product.id, 1); // Thêm sản phẩm vào giỏ hàng với số lượng 1
        alert('Product added to cart successfully!');
      } else {
        alert('Please log in to add products to your cart.');
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={handlePress}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.category}>{product.category}</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.modalPrice}>Price: ${product.price.toFixed(2)}</Text>
          <Text>Category: {product.category}</Text>
          <Text>Brand: {product.brand}</Text>
          <Text>Condition: {product.condition}</Text>
          <Button title="Add to Cart" onPress={handleAddToCart} />
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  category: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 10,
    fontSize: 14,
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductCard;
