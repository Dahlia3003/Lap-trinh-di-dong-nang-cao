import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
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
  }, [navigation]);

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
                <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
                <Text style={styles.emailText}>Email: {user.email}</Text>
                {isEditing ? (
                    <>
                      <TextInput
                          style={styles.input}
                          placeholder="New Name"
                          value={newName}
                          onChangeText={setNewName}
                      />
                      <TouchableOpacity style={styles.button} onPress={handleEditInfo}>
                        <Text style={styles.buttonText}>Save</Text>
                      </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                      <Text style={styles.buttonText}>Edit Info</Text>
                    </TouchableOpacity>
                )}
              </>
          )}
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f0f4f8' },
  profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  emailText: { fontSize: 16, marginBottom: 20, color: '#666' },
  input: {
    width: '80%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    width: '80%',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
