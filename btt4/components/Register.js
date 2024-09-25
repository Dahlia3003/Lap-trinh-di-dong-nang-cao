import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { register } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtpPage from "./OtpPage";

const Register = ({ navigation }) => {
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
  });

  const handleRegister = async (values) => {
    try {
      await AsyncStorage.setItem('registerName', values.name);
      await AsyncStorage.setItem('registerEmail', values.email);
      await AsyncStorage.setItem('registerPassword', values.password);
      navigation.navigate('OtpPage', { email: values.email, onSuccess: handleOtpSuccess });
    } catch (error) {
      Alert.alert('Failed to save registration information');
    }
  };

  const handleOtpSuccess = async () => {
    try {
      const name = await AsyncStorage.getItem('registerName');
      const email = await AsyncStorage.getItem('registerEmail');
      const password = await AsyncStorage.getItem('registerPassword');
      const user = await register({ name, email, password });
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Registration failed. Please check again');
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={registerSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <Button title="Register" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: '80%', padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  error: { color: 'red' },
});

export default Register;
