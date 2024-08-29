import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './StartScreen';
import InfoScreen from './InfoScreen';
import HelloWorldScreen from './HelloWorldScreen';

export type RootStackParamList = {
    Start: undefined;
    Info: undefined;
    HelloWorld: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="HelloWorld" component={HelloWorldScreen} />
        </Stack.Navigator>
    );
}
