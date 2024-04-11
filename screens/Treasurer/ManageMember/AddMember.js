import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import uri from "../../../config/apiConfig";

const AddMember = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (field, value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${uri}/signUp`, userInfo);
      Alert.alert(
        "Sign Up Successful",
        "Your member account has been created."
      );
      console.log("Member Added");
      navigation.navigate("MainScreen");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        console.error("Email is already in use.");
      } else {
        console.error("An error occurred. Please try again.");
      }
      return;
    }
  };

  return (
    <View style={addMember.container}>
      <Text style={addMember.header}>
        Please Fill in the following information to add a coach
      </Text>
      <TextInput
        style={addMember.input}
        placeholder="Name"
        value={userInfo.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={addMember.input}
        placeholder="Email"
        value={userInfo.email}
        onChangeText={(text) => handleChange("email", text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={addMember.input}
        placeholder="Password"
        value={userInfo.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />
      <TextInput
        style={addMember.input}
        placeholder="Phone Number"
        value={userInfo.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
        inputMode="phone-pad"
      />
      <TextInput
        style={addMember.input}
        placeholder="Address"
        value={userInfo.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <Button title="Sign Up Member" onPress={handleSignUp} />
    </View>
  );
};

export default AddMember;

const addMember = StyleSheet.create({
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
