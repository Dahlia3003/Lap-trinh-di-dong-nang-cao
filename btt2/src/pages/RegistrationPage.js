import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RegistrationForm from '../components/Auth/RegistrationForm';

const RegistrationPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký</Text>
            <RegistrationForm onSuccess={() => navigation.navigate('EmailVerification')} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, textAlign: 'center', marginBottom: 24 },
    link: { color: 'blue', textAlign: 'center', marginTop: 16 }
});

export default RegistrationPage;
