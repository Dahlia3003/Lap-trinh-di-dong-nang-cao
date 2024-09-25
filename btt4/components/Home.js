import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';

const Home = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        navigation.navigate('Login');
      }
    };

    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('AUTH-TOKEN');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {user && (
          <>
            <Text>Welcome, {user.name}!</Text>
            <Text>Email: {user.email}</Text>
          </>
        )}
        <Button onPress={() => navigation.navigate('Profile')} title="Go to Profile" />
        <Button onPress={() => navigation.navigate('ProductList')} title="Go to Products" />
        <Button onPress={handleLogout} title="Logout" />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Home;
