import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(224, 87%, 25%)',
    },
    welcome:{
        color: '#FFF',
        textShadowColor: '#FFF',
        textShadowOffset:{width: -3, height: 2},
        textShadowRadius: 10,
        letterSpacing: 1,
        fontSize: 30
    }
});

const Member = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcome}>Welcome, Member</Text>
        </SafeAreaView>
    );
};
export default Member