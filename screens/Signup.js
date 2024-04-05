import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import uri from "../config/apiConfig";

const SignUpScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  const handleNameChange = (text) => {
    setUserInfo((prevState) => ({
      ...prevState,
      name: text,
    }));
    setError("");
  };

  const handleEmailChange = (text) => {
    setUserInfo((prevState) => ({
      ...prevState,
      email: text,
    }));
    setError("");
    if (!text.trim() || !text.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setError("Invalid email format.");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = (text) => {
    setUserInfo((prevState) => ({
      ...prevState,
      password: text,
    }));
    setError("");
    if (!text.trim() || !text.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      setError(
        "Password must contain at least 8 characters, including upper and lower case letters, and numbers."
      );
    } else {
      setError("");
    }
  };

  const handleAddressChange = (text) => {
    setUserInfo((prevState) => ({
      ...prevState,
      address: text,
    }));
    setError("");
  };

  const handlePhoneNumberChange = (text) => {
    setUserInfo((prevState) => ({
      ...prevState,
      phoneNumber: text,
    }));
    setError("");
    if (!text.trim() || !text.match(/^[0-9]{10,11}$/)) {
      setError("Phone number must contain between 10 to 11 digits.");
    } else {
      setError("");
    }
  };

  const handleSignUp = async () => {
    setError("");
    try {
      const response = await axios.post(`${uri}/signUp`, userInfo);
      console.log(response.data);
      Alert.alert("Sign Up Successful", "Your account has been created.");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        // Example: Check for 409 Conflict status code
        setError("Email is already in use.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Join Recreation Club</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {/* Display error message if exists */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userInfo.name}
        onChangeText={(text) => handleNameChange(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.email}
        onChangeText={(text) => handleEmailChange(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userInfo.password}
        onChangeText={(text) => handlePasswordChange(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userInfo.phoneNumber}
        onChangeText={(text) => handlePhoneNumberChange(text)}
        keyboardType="phone-pad" // Set appropriate keyboard type
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userInfo.address}
        onChangeText={(text) => handleAddressChange(text)}
      />
      <Button
        title="Sign Up"
        onPress={handleSignUp}
        color={error ? "red" : "#007AFF"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    marginBottom: 15,
    color: "red",
    textAlign: "center",
  },
});

export default SignUpScreen;
