import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to ProjectCT!</Text>
      <Button onPress={() => navigation.navigate('Profile')} title="Go to Profile" />
      <Button onPress={() => navigation.navigate('Login')} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Home;
