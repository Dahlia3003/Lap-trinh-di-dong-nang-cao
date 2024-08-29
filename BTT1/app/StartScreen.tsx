import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './index';

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

const StartScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to My App!</Text>
            <Button
                title="Start"
                onPress={() => navigation.navigate('Info')}
            />
        </View>
    );
};

export default StartScreen;
