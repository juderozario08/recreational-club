import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Coach = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Simulate role selection with buttons */}
            <Text>This is the Coach Home Screen</Text>
        </SafeAreaView>
    );
};
export default Coach