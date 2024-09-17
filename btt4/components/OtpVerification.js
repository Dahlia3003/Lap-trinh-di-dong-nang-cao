import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { sendOtp, verifyOtp } from '../services/apiService';

const OtpVerification = ({ email, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      setIsOtpSent(true);
      Alert.alert('OTP sent successfully');
    } catch (error) {
      Alert.alert('Failed to send OTP');
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await sendOtp(email);
      Alert.alert('OTP re-sent successfully');
    } catch (error) {
      Alert.alert('Failed to re-send OTP');
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(email, otp);
      Alert.alert('OTP verified successfully');
      onSuccess();
    } catch (error) {
      Alert.alert('Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      {!isOtpSent ? (
        <Button title="Send OTP" onPress={handleSendOtp} />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
          <Button
            title={isResending ? "Re-sending..." : "Re-send OTP"}
            onPress={handleResendOtp}
            disabled={isResending}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { width: '80%', padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
});

export default OtpVerification;
