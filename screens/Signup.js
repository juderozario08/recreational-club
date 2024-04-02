import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import uri from '../config/apiConfig';

const SignUpScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '', 
    address: '',
    phoneNumber: '',
  });
  const [error, setError] = useState(''); // Add state to track the error message

  const handleInputChange = (name, value) => {
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setError(''); // Reset error message on input change
  };

  const validateFields = () => {
    if (!userInfo.name.trim()) {
      setError('Name cannot be empty.');
      return false;
    }
    if (!userInfo.email.trim()) {
      setError('Email cannot be empty.');
      return false;
    }
    if (!userInfo.password) { // Assuming empty password is not acceptable
      setError('Password cannot be empty.');
      return false;
    }

    if (!userInfo.address) { // Assuming empty password is not acceptable
      setError('Address cannot be empty.');
      return false;
    }

    if (!userInfo.phoneNumber) { // Assuming empty password is not acceptable
      setError('Phone number cannot be empty.');
      return false;
    }
    return true; // All fields are valid
  };

  const handleSignUp = async () => {
    // Reset previous error messages
    setError('');
  
    // Validate fields first
    if (!validateFields()) {
      return; // Stop the sign-up process if validation fails
    }
  
    try {
      const response = await axios.post(`${uri}/signUp`, userInfo);
      console.log(response.data);
      Alert.alert("Sign Up Successful", "Your account has been created.");
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) { // Example: Check for 409 Conflict status code
        setError("Email is already in use.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Join Recreation Club</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null} {/* Display error message if exists */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userInfo.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.email}
        onChangeText={text => handleInputChange('email', text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userInfo.password}
        onChangeText={text => handleInputChange('password', text)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userInfo.phoneNumber}
        onChangeText={text => handleInputChange('phoneNumber', text)}
        keyboardType="phone-pad" // Set appropriate keyboard type
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userInfo.address}
        onChangeText={text => handleInputChange('address', text)}
      />
      <Button title="Sign Up" onPress={handleSignUp} color={error ? 'red' : '#007AFF'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  errorText: {
    marginBottom: 15,
    color: 'red',
    textAlign: 'center',
  },
});

export default SignUpScreen;

