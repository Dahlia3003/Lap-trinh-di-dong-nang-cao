import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginPage = ({ navigation }) => {
    const handleLogin = () => {
        // Xử lý đăng nhập thành công
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry />
            <Button title="Đăng nhập" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.link}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.link}>Đăng ký</Text>
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

export default LoginPage;
