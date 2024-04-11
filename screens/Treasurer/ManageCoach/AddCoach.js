import React, { useState } from "react";
import { Text, TextInput, Button, View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import uri from "../../../config/apiConfig";

const AddCoach = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    role: "coach",
  });

  const handleChange = (field, value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${uri}/signUp/coach`, userInfo);
      Alert.alert("Sign Up Successful", "Your coach account has been created.");
      console.log("Coach Added");
      navigation.navigate("MainScreen");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        console.error("Email is already in use.");
      } else {
        console.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <View style={addCoach.container}>
      <Text style={addCoach.header}>
        Please Fill in the following information to add a coach
      </Text>
      <TextInput
        style={addCoach.input}
        placeholder="Name"
        value={userInfo.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={addCoach.input}
        placeholder="Email"
        value={userInfo.email}
        onChangeText={(text) => handleChange("email", text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={addCoach.input}
        placeholder="Password"
        value={userInfo.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />
      <TextInput
        style={addCoach.input}
        placeholder="Phone Number"
        value={userInfo.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
        inputMode="phone-pad"
      />
      <TextInput
        style={addCoach.input}
        placeholder="Address"
        value={userInfo.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <Button title="Sign Up Coach" onPress={handleSignUp} />
    </View>
  );
};

export default AddCoach;

const addCoach = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    marginBottom: 15,
    color: "red",
    textAlign: "center",
  },
});
