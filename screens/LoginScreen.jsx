import React from 'react';
import { SafeAreaView, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
});

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Simulate role selection with buttons */}
      <Button title="Login as Member" onPress={() => navigation.navigate('Member')} />
      <Button title="Login as Coach" onPress={() => navigation.navigate('Coach')} />
      <Button title="Login as Treasurer" onPress={() => navigation.navigate('Treasurer')} />
    </SafeAreaView>
  );
};
export default LoginScreen