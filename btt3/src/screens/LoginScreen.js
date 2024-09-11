import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useTailwind } from 'tailwindcss-react-native';
import { login } from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const tailwind = useTailwind();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Login failed', 'Invalid email or password');
    }
  };

  return (
    <View style={tailwind('flex-1 items-center justify-center bg-white')}>
      <Text style={tailwind('text-2xl font-bold')}>Login</Text>
      <TextInput
        style={tailwind('border p-2 m-2 w-3/4')}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tailwind('border p-2 m-2 w-3/4')}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;