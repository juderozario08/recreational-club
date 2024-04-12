import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import uri from "../../config/apiConfig";

const TreasurerScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profileSelected, setProfileSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async () => {
    const updatedProfile = {
      name,
      email,
      address,
      phoneNumber,
    };
    await axios
      .put(`${uri}/users/${user._id}`, updatedProfile)
      .then(() => {
        setModalVisible(!modalVisible);
        setProfileSelected(null);
        fetchUserData();
      })
      .catch((error) => {
        console.error("Error updating member: ", error.message);
      });
  };
  const fetchUserData = async () => {
    try {
      const userid = await AsyncStorage.getItem("userId");
      const response = await axios.get(`${uri}/users/${userid}`);
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setAddress(response.data.address);
      setPhoneNumber(response.data.phoneNumber);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.profileView}>
          <Text style={styles.heading}>Welcome, Treasurer</Text>
          <Text style={styles.subHeading}>Profile Information</Text>
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
      <Pressable
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
          setProfileSelected(user);
        }}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </Pressable>
      {profileSelected && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Updating {user.name}'s Information
              </Text>
              <View style={styles.inputGrid}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Address:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.buttonrow}>
                <Pressable
                  style={styles.submitButton}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <Navbar navigateTo={navigation.navigate} />
    </View>
  );
};

export default TreasurerScreen;

const Navbar = ({ navigateTo }) => {
  const navElements = [
    { name: "Profile", color: true },
    { name: "Statement", color: false },
    { name: "Coaches", color: false },
    { name: "Members", color: false },
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
  subHeading: {
    fontSize: 20,
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
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    gap: 5,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 10,
  },
  closeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  closeButtonText: {
    fontWeight: "bold",
  },
  submitButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AAAAAA",
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    fontWeight: "bold",
  },
  inputView: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonrow: {
    gap: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
});
