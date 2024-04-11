import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import uri from "../../config/apiConfig";

const TreasurerScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const navElements = [
    { name: "Profile", color: true },
    { name: "Statement", color: false },
    { name: "Coaches", color: false },
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

  const fetchUserData = async () => {
    try {
      const userid = await AsyncStorage.getItem("userId");
      const response = await axios.get(`${uri}/users/${userid}`);
      setUser(response.data);
      console.log("User Loaded");
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.profileView}>
          <Text style={styles.heading}>Profile</Text>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Address: {user.address}</Text>
          <Text style={styles.text}>Phone Number: {user.phoneNumber}</Text>
        </View>
      ) : (
        <Text style={{ alignItems: "center", justifyContent: "center" }}>
          Loading user data...
        </Text>
      )}
      <Navbar navigateTo={navigation.navigate} />
    </View>
  );
};

export default TreasurerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  profileView: {
    width: "90%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
    padding: 20,
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
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
