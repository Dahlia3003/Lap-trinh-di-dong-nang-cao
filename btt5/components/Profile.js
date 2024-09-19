import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';

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
                <Button title="Send OTP" onPress={handleSendOtp} />
                {isOtpSent && (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="OTP"
                      value={otp}
                      onChangeText={setOtp}
                    />
                    <Button title="Verify OTP" onPress={handleVerifyOtp} />
                  </>
                )}
                {isOtpVerified && <Button title="Update Info" onPress={handleUpdateUserInfo} />}
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
