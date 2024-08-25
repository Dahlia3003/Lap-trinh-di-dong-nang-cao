import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './index';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const InfoScreen: React.FC<Props> = ({ navigation }) => {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        if (countdown === 0) {
            navigation.navigate('HelloWorld');
        }

        return () => clearInterval(timer);
    }, [countdown, navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/avatar.jpg')} style={styles.avatar} />
            <Text style={styles.name}>Huỳnh Nam Duy</Text>
            <Text style={styles.info}>MSSV: 21110152</Text>
            <Text style={styles.info}>Sinh viên công nghệ thông tin</Text>
            <Text style={styles.info}>Lớp 21110CLST1</Text>
            <Text style={styles.info}>Trường ĐH SPKT TP.HCM</Text>
            <Text style={styles.countdown}>Chuyển hướng sau {countdown} giây...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
    countdown: {
        marginTop: 20,
        fontSize: 16,
        color: 'red',
    },
});

export default InfoScreen;
