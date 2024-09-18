import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

const ProductCard = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.category}>{product.category}</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{product.name}</Text>
          <Text>{product.description}</Text>
          <Text>Price: ${product.price}</Text>
          <Text>Category: {product.category}</Text>
          <Text>Brand: {product.brand}</Text>
          <Text>Condition: {product.productCondition}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 10, margin: 10, backgroundColor: '#fff', borderRadius: 5 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'green' },
  category: { fontSize: 14, color: 'gray' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default ProductCard;