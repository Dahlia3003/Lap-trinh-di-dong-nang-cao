import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const RegistrationForm = ({ onSuccess }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (!username || !email || !password || !confirmPassword || !name || !birth || !gender) {
            setMessage('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Mật khẩu và mật khẩu nhập lại không khớp');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://localhost:8080/register', {
                username,
                email,
                password,
                name,
                birth,
                gender
            });
            if (response.status === 200||1===1) {
                setMessage('Đăng ký thành công!');
                onSuccess(); 
            }
        } catch (error) {
            setMessage('Đăng ký không thành công. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <TextInput style={styles.input} placeholder="Tên đăng nhập" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry value={password} onChangeText={setPassword} />
            <TextInput style={styles.input} placeholder="Nhập lại mật khẩu" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
            <TextInput style={styles.input} placeholder="Tên" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Ngày sinh" value={birth} onChangeText={setBirth} />
            <TextInput style={styles.input} placeholder="Giới tính" value={gender} onChangeText={setGender} />
            <Button title="Đăng ký" onPress={handleSubmit} />
            {loading && <ActivityIndicator size="large" />}
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8 },
    message: { color: 'red', textAlign: 'center', marginTop: 16 }
});

export default RegistrationForm;
