import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import uri from "../../config/apiConfig";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const CoachManagement = ({ navigation }) => {
  const [coachList, setCoachList] = useState([]);

  const AddCoach = () => {
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
        Alert.alert(
          "Sign Up Successful",
          "Your coach account has been created."
        );
        console.log("Coach Added");
        await fetchCoaches();
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
        <Text style={styles.heading}>
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
          keyboardType="phone-pad"
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

  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${uri}/users/coaches`);
      const coachesData = response.data.map((coach) => ({
        ...coach,
        classes: [],
      }));
      setCoachList(coachesData);
      console.log("Coaches Loaded");
    } catch (error) {
      console.error("Error fetching coaches: ", error.message);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const handleCoachPress = (coach) => {
    console.log("Coach Pressed");
  };

  const MainScreen = ({ navigation }) => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Coach Management</Text>
        {coachList.map((coach, index) => (
          <View key={index} style={styles.coachContainer}>
            <Pressable onPress={() => handleCoachPress(coach)}>
              <Text style={styles.text}>{coach.name}</Text>
            </Pressable>
            <View style={styles.classesContainer}>
              {coach.classes.map((cls, idx) => (
                <View key={idx} style={styles.classContainer}>
                  <Text style={styles.textClasses}>{cls.title}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        <Button
          title={"Add Coach"}
          onPress={() => navigation.navigate("AddCoach")}
        />
      </ScrollView>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="AddCoach" component={AddCoach} />
    </Stack.Navigator>
  );
};

export default CoachManagement;
const addCoach = StyleSheet.create({
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  coachContainer: {
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    width: "90%",
    alignItems: "center",
  },
  coachPressable: {
    backgroundColor: "#007AFF",
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  textClasses: {
    fontSize: 13,
    textAlign: "center",
    color: "#333",
  },
  classContainer: {
    width: "40%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
