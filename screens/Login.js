import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Simulate role selection with buttons */}
      <Button title="Login as Member" onPress={() => navigation.navigate('Member')} />
      <Button title="Login as Coach" onPress={() => navigation.navigate('Coach')} />
      <Button title="Login as Treasurer" onPress={() => navigation.navigate('Treasurer')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});