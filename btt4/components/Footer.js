import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navigation}>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Products" onPress={() => navigation.navigate('ProductList')} />
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderTopWidth: 1, borderColor: 'gray' },
});

export default Footer;