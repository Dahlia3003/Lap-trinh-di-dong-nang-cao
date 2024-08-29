import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ForgotPasswordPage = ({ navigation }) => {
    const handleForgotPassword = () => {
        // Xử lý quên mật khẩu thành công
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <TextInput style={styles.input} placeholder="Email" />
            <Button title="Gửi yêu cầu" onPress={handleForgotPassword} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, textAlign: 'center', marginBottom: 24 },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8 },
    link: { color: 'blue', textAlign: 'center', marginTop: 16 }
});

export default ForgotPasswordPage;
