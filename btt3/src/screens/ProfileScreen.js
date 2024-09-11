import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useTailwind } from 'tailwindcss-react-native';
import { getAccount } from '../services/authService';
import API_BASE_URL from '../config/apiConfig';

const ProfileScreen = () => {
  const tailwind = useTailwind();
  const account = getAccount();
  const [firstName, setFirstName] = useState(account.firstName);
  const [lastName, setLastName] = useState(account.lastName);
  const [otp, setOtp] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/user/update?userId=${account.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${account.token}`,
        },
        body: JSON.stringify({ firstName, lastName, otp }),
      });

      if (response.ok) {
        Alert.alert('Profile updated successfully');
      } else {
        Alert.alert('Failed to update profile');
      }
    } catch (error) {
      Alert.alert('An error occurred. Please try again.');
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/user/send-otp?email=${account.email}`, {
        method: 'POST',
      });

      if (response.ok) {
        Alert.alert('OTP sent to your email');
      } else {
        Alert.alert('Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={tailwind('flex-1 items-center justify-center bg-white')}>
      <Text style={tailwind('text-2xl font-bold')}>Profile</Text>
      <TextInput
        style={tailwind('border p-2 m-2 w-3/4')}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={tailwind('border p-2 m-2 w-3/4')}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={tailwind('border p-2 m-2 w-3/4')}
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Send OTP" onPress={handleSendOtp} />
      <Button title="Update Profile" onPress={handleUpdate} />
    </View>
  );
};

export default ProfileScreen;
