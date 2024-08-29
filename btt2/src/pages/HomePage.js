import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trang Chính</Text>
            <Button title="Đăng xuất" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    title: { fontSize: 24, marginBottom: 24 },
});

export default HomePage;
