import axios from "axios";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import uri from "../../../config/apiConfig";

const MainScreen = ({ navigation }) => {
  const [memberList, setMemberList] = useState([]);
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${uri}/users/members`);
      setMemberList(response.data);
    } catch (e) {
      console.error("Error fetching members: ", e.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMembers();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Member Management</Text>
      {memberList.map((member, index) => (
        <Text key={index} style={styles.text}>
          {member.name}
        </Text>
      ))}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#0056b3" : "#007bff",
          },
          styles.button,
        ]}
        onPress={() => navigation.navigate("AddMember")}
      >
        <Text style={styles.buttonText}>Add Member</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#0056b3" : "#007bff",
            marginTop: 10, // Adjust spacing between buttons
          },
          styles.button,
        ]}
        onPress={() => navigation.navigate("SearchMember")}
      >
        <Text style={styles.buttonText}>Search Or Update Member</Text>
      </Pressable>
      <Navbar navigateTo={navigation.navigate} />
    </ScrollView>
  );
};

const Navbar = ({ navigateTo }) => {
  const navElements = [
    { name: "Profile", color: false },
    { name: "Statement", color: false },
    { name: "Coaches", color: false },
    { name: "Members", color: true },
  ];

  const onPressTab = (tabName) => {
    if (tabName === "Profile") navigateTo("treasurerScreen");
    else if (tabName === "Statement") navigateTo("CreditStatement");
    else if (tabName === "Coaches") navigateTo("CoachManagement");
    else if (tabName === "Members") navigateTo("MemberManagement");
  };
  return (
    <View style={[styles.navbar, { position: "absolute", bottom: 0, left: 0 }]}>
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

export default MainScreen;

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
    marginBottom: 10,
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
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
