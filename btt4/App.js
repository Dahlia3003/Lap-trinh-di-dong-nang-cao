import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './components/Register';
import Login from './components/Login';
import VerifyOTP from './components/VerifyOTP';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Profile from './components/Profile'; // Import Profile component

const Stack = createStackNavigator();

const createDefaultAccount = async () => {
  const defaultEmail = 'default@example.com';
  const defaultPassword = 'password123';
  const defaultName = 'Default User';
  const defaultPhone = '1234567890';
  const defaultAvatar = 'https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/453085609_122119503026358465_2020257007915132770_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFMgi24BRfg4LEyOdRvJOvIw02BkuwTUgTDTYGS7BNSBGdBoFn5HoKaGEHqszT4q9UNhc2pPWGLJXRoENrGttQi&_nc_ohc=0iHKb4SMZPUQ7kNvgF3MNoP&_nc_ht=scontent-hkg1-2.xx&_nc_gid=AxniE7boPOSgp2gnbyg0vEs&oh=00_AYCgCLxCeD_6ITxQOzoAxXICYODZNn1y2p2w6XiaAFySJw&oe=66E82FBB';

  const savedEmail = await AsyncStorage.getItem('userEmail');
  if (1===1) {
    await AsyncStorage.setItem('userEmail', defaultEmail);
    await AsyncStorage.setItem('userPassword', defaultPassword);
    await AsyncStorage.setItem('userName', defaultName);
    await AsyncStorage.setItem('userPhone', defaultPhone);
    await AsyncStorage.setItem('userAvatar', defaultAvatar);
    await AsyncStorage.setItem('isActivated', 'true');
    console.log('Default account created');
  } else {
    console.log('Default account already exists');
  }
};

export default function App() {
  useEffect(() => {
    createDefaultAccount();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}