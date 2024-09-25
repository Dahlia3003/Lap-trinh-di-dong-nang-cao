import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { sendOtp } from '../services/apiService';

const SendOtpButton = ({ email, onOtpSent }) => {
  const [isSending, setIsSending] = useState(false);

  const handleSendOtp = async () => {
    setIsSending(true);
    try {
      await sendOtp(email);
      Alert.alert('OTP sent successfully');
      onOtpSent();
    } catch (error) {
      Alert.alert('Failed to send OTP');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Button
      title={isSending ? "Sending..." : "Send OTP"}
      onPress={handleSendOtp}
      disabled={isSending}
    />
  );
};

export default SendOtpButton;