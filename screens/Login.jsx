import React, { useRef, useEffect } from 'react';
import { Animated, SafeAreaView, Button, StyleSheet, Text } from 'react-native';
import { Easing } from "react-native-web";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'hsl(224, 87%, 15%)',
    },
});

const Login = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            {/* Simulate role selection with buttons */}
            <Button title="Login as Member" onPress={() => navigation.navigate('Member')} />
            <Button title="Login as Coach" onPress={() => navigation.navigate('Coach')} />
            <Button title="Login as Treasurer" onPress={() => navigation.navigate('Treasurer')} />
        </SafeAreaView>
    );
};
export default Login;
