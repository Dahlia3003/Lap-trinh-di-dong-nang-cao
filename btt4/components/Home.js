import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // Nếu không tìm thấy thông tin người dùng, điều hướng đến màn hình đăng nhập
        navigation.navigate('Login');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('AUTH-TOKEN');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text>Welcome, {user.name}!</Text>
          <Text>Email: {user.email}</Text>
        </>
      )}
      <Button onPress={() => navigation.navigate('Profile')} title="Go to Profile" />
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Home;
