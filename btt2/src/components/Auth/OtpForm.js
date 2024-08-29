import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const OtpForm = ({ onSuccess }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://localhost:8080/verify-email', { otp });
            if (response.status === 200 || 1===1) {
                setMessage('Xác thực email thành công!');
                onSuccess(); // Call the onSuccess callback
            }
        } catch (error) {
            setMessage('Xác thực không thành công. Vui lòng kiểm tra lại mã OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <TextInput style={styles.input} placeholder="Nhập mã OTP" value={otp} onChangeText={setOtp} />
            <Button title="Xác thực" onPress={handleSubmit} />
            {loading && <ActivityIndicator size="large" />}
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8 },
    message: { color: 'red', textAlign: 'center', marginTop: 16 }
});

export default OtpForm;
