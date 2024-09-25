import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';
import { sendOtp, updateUserInfo } from '../services/apiService';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditInfo = async () => {
    try {
      await AsyncStorage.setItem('newName', newName);
      navigation.navigate('OtpPage', { email: user.email, onSuccess: handleOtpSuccess });
    } catch (error) {
      Alert.alert('Failed to send OTP');
    }
  };

  const handleOtpSuccess = async () => {
    try {
      const newName = await AsyncStorage.getItem('newName');
      await updateUserInfo(user.email, newName);
      Alert.alert('User info updated successfully');
      const updatedUser = { ...user, name: newName };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert('Failed to update user info');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('AUTH-TOKEN');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.profileContainer}>
        {user && (
          <>
            <Text>Welcome, {user.name}!</Text>
            <Text>Email: {user.email}</Text>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="New Name"
                  value={newName}
                  onChangeText={setNewName}
                />
                <Button title="Save" onPress={handleEditInfo} />
              </>
            ) : (
              <Button title="Edit Info" onPress={() => setIsEditing(true)} />
            )}
          </>
        )}
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { width: '80%', padding: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10 },
});

export default Profile;
