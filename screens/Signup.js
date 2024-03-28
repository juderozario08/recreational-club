import React, {useState} from 'react';
import {Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput} from 'react-native';
import axios from 'axios';
import uri from '../config/apiConfig';

const placeHolderColor = 'grey';
const SignUpScreen = ({navigation}) => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        name: '',
        address: '',
        phoneNumber: '',
    });
    // Add state to track the error message
    const [error, setError] = useState('');
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
        if (!userInfo.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setError('Invalid Email Format')
            return false;
        }
        if (!userInfo.password) { // Assuming empty password is not acceptable
            setError('Password cannot be empty.');
            return false;
        }
        if (!userInfo.password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
            setError('Invalid password')
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
        if (!userInfo.phoneNumber.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)) {
            setError('Wrong Phone Number Format')
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Text style={styles.header}>Join Recreation Club</Text>
            {/* Display error message if exists */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={placeHolderColor}
                value={userInfo.name}
                onChangeText={text => handleInputChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={placeHolderColor}
                value={userInfo.email}
                onChangeText={text => handleInputChange('email', text)}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={placeHolderColor}
                value={userInfo.password}
                onChangeText={text => handleInputChange('password', text)}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor={placeHolderColor}
                value={userInfo.phoneNumber}
                onChangeText={text => handleInputChange('phoneNumber', text)}
                keyboardType="phone-pad" // Set appropriate keyboard type
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor={placeHolderColor}
                value={userInfo.address}
                onChangeText={text => handleInputChange('address', text)}
            />
            <Button title="Sign Up" onPress={handleSignUp} color={error ? 'red' : '#007AFF'}/>
        </KeyboardAvoidingView>
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
        alignItems: 'stretch',
        width: '100%',
        padding: 15,
        marginBottom: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    errorText: {
        marginBottom: 15,
        color: 'red',
        textAlign: 'center',
    },
});

export default SignUpScreen;

