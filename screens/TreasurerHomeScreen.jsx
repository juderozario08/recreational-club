import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const TreasurerHomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Simulate role selection with buttons */}
            <Text>This is the TreasurerHomeScreen </Text>
        </SafeAreaView>
    );
};
export default TreasurerHomeScreen