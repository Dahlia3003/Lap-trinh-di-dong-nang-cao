import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import OtpVerification from './OtpVerification';
import { sendOtp, verifyOtp, changePassword } from '../services/apiService';
import 'nativewind';

const ChangePassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      setIsOtpSent(true);
      Alert.alert('OTP sent successfully');
    } catch (error) {
      Alert.alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(email, otp);
      setIsOtpVerified(true);
      Alert.alert('OTP verified successfully');
    } catch (error) {
      Alert.alert('Invalid OTP');
    }
  };

  const handleChangePassword = async () => {
    try {
      await changePassword(email, newPassword);
      Alert.alert('Password changed successfully');
      navigation.navigate('Login'); // Quay lại trang đăng nhập
    } catch (error) {
      console.error('Change Password error:', error); // In ra lỗi chi tiết
      Alert.alert('Failed to change password', error.response?.data?.message || 'Unknown error'); // Hiển thị thông báo lỗi
    }
  };

  return (
    <View className="flex items-center justify-center min-h-screen bg-gray-100">
      <View className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center">Change Password</Text>
        
        {!isOtpSent ? (
          <>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <TouchableOpacity
              onPress={handleSendOtp}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              <Text className="text-center">Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : !isOtpVerified ? (
          <>
            <TextInput
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp} // Thêm ô nhập OTP
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
          <>
            <TextInput
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <TouchableOpacity
              onPress={handleChangePassword}
              className="w-full px-4 py-2 text-white bg-green-600 rounded-lg"
            >
              <Text className="text-center">Change Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ChangePassword;
