import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwindcss-react-native';
import { getAccount, clearAccount } from '../services/authService';

const HomeScreen = ({ navigation }) => {
  const tailwind = useTailwind();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const accountData = getAccount();
    if (!accountData) {
      navigation.navigate('Login');
    } else {
      setAccount(accountData);
    }
  }, []);

  const handleLogout = () => {
    clearAccount();
    navigation.navigate('Login');
  };

  return (
    <View style={tailwind('flex-1 items-center justify-center bg-white')}>
      <Text style={tailwind('text-2xl font-bold')}>Trang Chủ</Text>
      {account && (
        <View>
          <Text style={tailwind('text-lg')}>Welcome, {account.firstName} {account.lastName}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;