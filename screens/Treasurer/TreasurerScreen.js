import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import uri from "../../config/apiConfig";

const Drawer = createDrawerNavigator();

const TreasurerScreen = ({ rootNavigation }) => {
  const [user, setUser] = useState(null);

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
    </View>
  );
};

export default TreasurerScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  profileView: {
    width: "80%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
    padding: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
});
