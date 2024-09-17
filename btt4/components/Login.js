import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OtpVerification from './OtpVerification';
import { login } from '../services/apiService';
import 'nativewind';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpRequired, setIsOtpRequired] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
  });

  const handleLogin = async (values) => {
    setEmail(values.email);
    setPassword(values.password);
    setIsOtpRequired(true);
  };

  const handleOtpSuccess = async () => {
    try {
      const user = await login(email, password);
      navigation.navigate('Home', { user });
    } catch (error) {
      Alert.alert('Login failed. Please check again');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className="flex items-center justify-center min-h-screen bg-gray-100">
          <View className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <View className="flex items-center justify-center mb-6">
              <Image
                source={require('../assets/logo.png')}
                className="w-24 h-24"
                resizeMode="contain"
              />
            </View>
            <Text className="text-2xl font-bold text-center">Login</Text>
            <TextInput
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && <Text className="text-red-500">{errors.email}</Text>}
            <TextInput
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && <Text className="text-red-500">{errors.password}</Text>}
            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              <Text className="text-center">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              className="w-full px-4 py-2 text-white bg-gray-600 rounded-lg"
            >
              <Text className="text-center">Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
              <Text className="text-center text-blue-600">Forgot password?</Text>
            </TouchableOpacity>
          </View>
          {isOtpRequired && <OtpVerification email={email} onSuccess={handleOtpSuccess} />}
        </View>
      )}
    </Formik>
  );
};

export default Login;