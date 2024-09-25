import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { verifyOtp, sendOtp } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpPage = ({ route }) => {
  const { email, onSuccess } = route.params;
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSendOtp = async () => {
    setIsSending(true);
    try {
      await sendOtp(email);
      Alert.alert('OTP sent successfully');
      setIsOtpSent(true);
    } catch (error) {
      Alert.alert('Failed to send OTP');
    } finally {
      setIsSending(false);
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.label}>OTP will be sent to: </Text>
        <Text style={styles.label}>{email}</Text>
        <TouchableOpacity
            onPress={handleSendOtp}
            style={styles.button}
            disabled={isSending}
        >
          <Text style={styles.buttonText}>{isSending ? 'Sending...' : 'Send OTP'}</Text>
        </TouchableOpacity>

        {isOtpSent && (
            <>
              <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
              />
              <TouchableOpacity
                  onPress={handleVerifyOtp}
                  style={styles.button}
              >
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={handleResendOtp}
                  style={styles.resendButton}
                  disabled={isResending}
              >
                <Text style={styles.resendButtonText}>
                  {isResending ? 'Re-sending...' : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#888',
    alignItems: 'center',
    marginVertical: 10,
  },
  resendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OtpPage;
