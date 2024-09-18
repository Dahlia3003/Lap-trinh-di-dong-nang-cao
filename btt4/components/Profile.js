import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtpVerification from './OtpVerification';
import { sendOtp, verifyOtp, updateUserInfo } from '../services/apiService';
import 'nativewind';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
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
  }, []);

  const handleSendOtp = async () => {
    try {
      await sendOtp(user.email);
      setIsOtpSent(true);
      Alert.alert('OTP sent successfully');
    } catch (error) {
      Alert.alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(user.email, otp);
      setIsOtpVerified(true);
      Alert.alert('OTP verified successfully');
    } catch (error) {
      Alert.alert('Invalid OTP');
    }
  };

  const handleUpdateUserInfo = async () => {
    try {
      await updateUserInfo(user.email, newName);
      Alert.alert('User info updated successfully');
      setUser({ ...user, name: newName });
      setIsEditing(false);
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
      {user ? (
        <>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Button onPress={handleLogout} title="Logout" />
          <Button onPress={() => setIsEditing(true)} title="Edit Info" />
          {isEditing && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Enter new name"
                value={newName}
                onChangeText={setNewName}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {!isOtpSent ? (
                <TouchableOpacity
                  onPress={handleSendOtp}
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
                >
                  <Text className="text-center">Send OTP</Text>
                </TouchableOpacity>
              ) : !isOtpVerified ? (
                <>
                  <TextInput
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <TouchableOpacity
                    onPress={handleVerifyOtp}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
                  >
                    <Text className="text-center">Verify OTP</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={handleUpdateUserInfo}
                  className="w-full px-4 py-2 text-white bg-green-600 rounded-lg"
                >
                  <Text className="text-center">Update Info</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 10 },
  editContainer: { marginTop: 20, width: '100%', alignItems: 'center' },
});

export default Profile;
