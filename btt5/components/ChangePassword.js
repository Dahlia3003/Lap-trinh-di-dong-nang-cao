import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';

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
      navigation.navigate('Login');
    } catch (error) {
      console.error('Change Password error:', error);
      Alert.alert('Failed to change password', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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
        {isOtpVerified && (
          <>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <Button title="Change Password" onPress={handleChangePassword} />
          </>
        )}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { width: '80%', padding: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10 },
});

export default ChangePassword;
