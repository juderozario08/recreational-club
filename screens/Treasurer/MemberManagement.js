import axios from "axios";
import { useEffect, useRef, useState } from "react";
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

const MemberManagement = () => {
  const [memberList, setMemberList] = useState([]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${uri}/users/members`);
      setMemberList(response.data);
      console.log("Members Loaded");
    } catch (e) {
      console.error("Error fetching members: ", e.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

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
        await fetchMembers();
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
      <View style={addMember.container}>
        <Text style={styles.heading}>
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
  const navElements = [
    { name: "Profile", color: false },
    { name: "Statement", color: false },
    { name: "Coaches", color: false },
    { name: "Members", color: true },
  ];
  const Navbar = ({ navigateTo }) => {
    const onPressTab = (tabName) => {
      if (tabName === "Profile") navigateTo("treasurerScreen");
      else if (tabName === "Statement") navigateTo("CreditStatement");
      else if (tabName === "Coaches") navigateTo("CoachManagement");
      else if (tabName === "Members") navigateTo("MemberManagement");
    };
    return (
      <View
        style={[styles.navbar, { position: "absolute", bottom: 0, left: 0 }]}
      >
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
  const MainScreen = ({ navigation }) => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Member Management</Text>
        {memberList.map((member, index) => (
          <Text key={index} style={styles.text}>
            {member.name}
          </Text>
        ))}
        <Button
          title={"Add Member"}
          onPress={() => navigation.navigate("AddMember")}
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
      <Stack.Screen name="AddMember" component={AddMember} />
    </Stack.Navigator>
  );
};

export default MemberManagement;
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
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
  },
  tab: {
    alignItems: "center",
    paddingVertical: 10,
  },
});
