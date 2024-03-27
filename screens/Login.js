import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import uri from '../config/apiConfig';
import { jwtDecode } from "jwt-decode";

import { useFocusEffect } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Reset loginError when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setLoginError(false);
    }, [])
  );

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${uri}/login`, { email, password });
      const { token } = response.data;

      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      navigation.navigate(userRole + 'Screen');

    } catch (error) {
      console.log(error);
      setLoginError(true);
      Alert.alert("Login Failed", "Incorrect email or password.");
    }
  };


  // Dynamic background color based on loginError state
  const backgroundColor = 'white'; // Choose a subtler color for the error state

  return (
    <View style={[styles.container, {backgroundColor}]}> 
      <Text style={styles.header}>Recreation Club</Text>
      {loginError && <Text style={styles.errorText}>Incorrect email or password.</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button 
          title="Login" 
          onPress={handleLogin}
          color={loginError ? 'red' : '#007AFF'} // Button color changes based on loginError
        />
      </View>
      <Text 
        style={styles.registerText}
        onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // Removed background color here to apply it dynamically in the component
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 20, // Add space below the button
  },
  errorText: {
    color: 'red',
    marginBottom: 20, // Add some space between the error text and the inputs
    textAlign: 'center',
  },
  registerText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;