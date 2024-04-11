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
  TouchableOpacity,
} from "react-native";
import uri from "../../config/apiConfig";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const CoachManagement = ({ navigation }) => {
  const [coachList, setCoachList] = useState([]);

  const AddCoach = ({ nav }) => {
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
        nav.navigate("MainScreen");
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
  const navElements = [
    { name: "Profile", color: false },
    { name: "Statement", color: false },
    { name: "Coaches", color: true },
    { name: "Members", color: false },
  ];
  const Navbar = ({ navigateTo }) => {
    const onPressTab = (tabName) => {
      if (tabName === "Profile") navigateTo("treasurerScreen");
      else if (tabName === "Statement") navigateTo("CreditStatement");
      else if (tabName === "Coaches") navigateTo("CoachManagement");
      else if (tabName === "Members") navigateTo("MemberManagement");
    };
    return (
      <View style={[styles.navbar, { position: "fixed", bottom: 0, left: 0 }]}>
        {navElements.map((element, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => onPressTab(element.name)}
          >
            <Text
              style={{
                color: element.color ? "#007bff" : "#aaa",
              }}
            >
              {element.name}
            </Text>
          </TouchableOpacity>
        ))}
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

  const MainScreen = () => {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}
      >
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
        <Navbar navigateTo={navigation.navigate} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  coachContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  classesContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  classContainer: {
    padding: 8,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    marginBottom: 5,
  },
  textClasses: {
    fontSize: 16,
    color: "#333",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 10,
  },
});

const addCoachStyles = StyleSheet.create({
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
