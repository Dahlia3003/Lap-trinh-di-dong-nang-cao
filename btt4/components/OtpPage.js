import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { verifyOtp, sendOtp } from '../services/apiService';
import SendOtpButton from './SendOtpButton';

const OtpPage = ({ route }) => {
  const { email, onSuccess } = route.params;
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleOtpSent = () => {
    setIsOtpSent(true);
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
      if (onSuccess) {
        onSuccess();
      } else {
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text>OTP will be sent to: {email}</Text>
      <SendOtpButton email={email} onOtpSent={handleOtpSent} />
      {isOtpSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
          <Button
            title={isResending ? "Re-sending..." : "Resend OTP"}
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

export default OtpPage;