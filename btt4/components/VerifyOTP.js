import React, { useState } from 'react';
import { View, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'nativewind';

const VerifyOTP = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    const savedOTP = await AsyncStorage.getItem('otp');
    if (savedOTP === otp + "") {
      await AsyncStorage.setItem('isActivated', 'true');
      Alert.alert('Account activated successfully');
      navigation.navigate('Login');
    } else {
      Alert.alert('Invalid OTP');
    }
  };

  return (
    <View className="flex items-center justify-center min-h-screen bg-gray-100">
      <View className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center">Verify OTP</Text>
        <TextInput
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
        />
        <TouchableOpacity
          onPress={handleVerifyOtp}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          <Text className="text-center">Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOTP;
