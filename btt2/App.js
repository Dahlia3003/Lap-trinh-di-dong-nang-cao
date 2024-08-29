import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/pages/HomePage';
import LoginPage from './src/pages/LoginPage';
import RegistrationPage from './src/pages/RegistrationPage';
import EmailVerificationPage from './src/pages/EmailVerificationPage';
import ForgotPasswordPage from './src/pages/ForgotPasswordPage';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Registration" component={RegistrationPage} />
                <Stack.Screen name="EmailVerification" component={EmailVerificationPage} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
