import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import axios from "axios";
import uri from "../../../config/apiConfig";

const UpdateCoachModal = ({ coach, modalVisible, setModalVisible }) => {
  const [name, setName] = useState(coach.name);
  const [email, setEmail] = useState(coach.email);
  const [address, setAddress] = useState(coach.address);
  const [phoneNumber, setPhoneNumber] = useState(coach.phoneNumber);

  const handleSubmit = async () => {
    const updatedCoach = {
      name,
      email,
      address,
      phoneNumber,
    };
    await axios
      .put(`${uri}/users/${coach._id}`, updatedCoach)
      .then(() => {
        console.log("Coach Updated");
        setModalVisible(!modalVisible);
      })
      .catch((error) => {
        console.error("Error updating coach: ", error.message);
      });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Updating {coach.name}'s Information
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
  );
};

const SearchCoach = ({ navigation }) => {
  const [coachList, setCoachList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedDeleteCoach, setSelectedDeleteCoach] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setFilteredUsers(
      coachList.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${uri}/users/coaches`);
      setCoachList(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching coaches: ", error.message);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      fetchCoaches();
    }
  }, [modalVisible]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${uri}/users/${id}`)
      .then(() => {
        fetchCoaches();
        setFilteredUsers(coachList);
        setSearchQuery("");
        handleSearch("");
        setConfirmModalVisible(false);
      })
      .catch((error) => {
        console.error("Error deleting coach: ", error.message);
      });
  };

  const handleUpdate = (coachId) => {
    const coachToUpdate = coachList.find((coach) => coach._id === coachId);
    setSelectedCoach(coachToUpdate);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update or Delete a Coach</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by Name"
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
        autoCapitalize="none"
      />
      <ScrollView>
        {filteredUsers.map((coach, idx) => (
          <View key={idx} style={styles.coachItem}>
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{coach.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#0056b3" : "#007bff",
                  },
                  styles.button,
                ]}
                onPress={() => handleUpdate(coach._id)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#9f3a38" : "#dc3545",
                  },
                  styles.button,
                ]}
                onPress={() => {
                  setConfirmModalVisible(true);
                  setSelectedDeleteCoach(coach);
                }}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      {selectedCoach && (
        <UpdateCoachModal
          coach={selectedCoach}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          fetchCoaches={fetchCoaches}
        />
      )}
      {selectedDeleteCoach && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmModalVisible}
          onRequestClose={() => setConfirmModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Delete</Text>
              <Text style={styles.modalText}>
                Are you sure you want to delete {selectedDeleteCoach.name}?
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#9f3a38" : "#dc3545",
                    },
                    styles.button,
                  ]}
                  onPress={() => handleDelete(selectedDeleteCoach._id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#6c757d" : "#adb5bd",
                    },
                    styles.button,
                  ]}
                  onPress={() => setConfirmModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SearchCoach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  coachItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
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
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
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
  buttonrow: {
    gap: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
});
