import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'nativewind';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }

    try {
      const response = await fetch('http://192.168.97.173:3000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setSentOtp(data.otp);
      setShowOtpInput(true);
      Alert.alert('OTP has been sent to your email');
    } catch (error) {
      Alert.alert('Error sending OTP');
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    if (otp === sentOtp + "") {
      Alert.alert('OTP verified successfully!', 'Please enter your new password');
    } else {
      Alert.alert('Incorrect OTP');
    }
  };

  const resetPassword = async () => {
    if (otp !== sentOtp + "") {
      Alert.alert('Please verify the OTP first');
      return;
    }

    if (!newPassword) {
      Alert.alert('Please enter your new password');
      return;
    }

    try {
      await AsyncStorage.setItem("userPassword", newPassword);
      Alert.alert('Password reset successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error resetting password');
    }
  };

  return (
    <View className="flex items-center justify-center min-h-screen bg-gray-100">
      <View className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {!showOtpInput ? (
          <>
            <Text className="text-2xl font-bold text-center">Forgot Password</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <TouchableOpacity
              onPress={sendOtp}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              <Text className="text-center">Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text className="text-2xl font-bold text-center">Verify OTP</Text>
            <TextInput
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <TouchableOpacity
              onPress={verifyOtp}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              <Text className="text-center">Verify OTP</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <TouchableOpacity
              onPress={resetPassword}
              className="w-full px-4 py-2 text-white bg-green-600 rounded-lg"
            >
              <Text className="text-center">Reset Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ForgotPassword;
