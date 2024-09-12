import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'nativewind';

const Profile = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isActivated, setIsActivated] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userIsActivated = await AsyncStorage.getItem('isActivated');
      const userName = await AsyncStorage.getItem('userName');
      const userPhone = await AsyncStorage.getItem('userPhone');
      const userAvatar = await AsyncStorage.getItem('userAvatar');

      setEmail(userEmail);
      setIsActivated(userIsActivated === 'true' ? 'Activated' : 'Not Activated');
      setName(userName);
      setPhone(userPhone);
      setAvatar(userAvatar);
    };

    fetchUserData();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      <View className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <Image source={{ uri: avatar }} className="w-32 h-32 rounded-full mx-auto mb-4" />
        <Text className="text-2xl font-bold text-center mb-4">Profile</Text>
        <View className="space-y-2">
          <Text className="text-lg font-semibold">Name: {name}</Text>
          <Text className="text-lg font-semibold">Email: {email}</Text>
          <Text className="text-lg font-semibold">Phone: {phone}</Text>
          <Text className="text-lg font-semibold">Status: {isActivated}</Text>
        </View>
        <Button onPress={() => navigation.navigate('Home')} title="Back to Home" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" />
      </View>
    </View>
  );
};

export default Profile;
