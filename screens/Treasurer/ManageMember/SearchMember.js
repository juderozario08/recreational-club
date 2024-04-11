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

const UpdateMemberModal = ({ member, modalVisible, setModalVisible }) => {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [address, setAddress] = useState(member.address);
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber);

  const handleSubmit = async () => {
    const updatedMember = {
      name,
      email,
      address,
      phoneNumber,
    };
    await axios
      .put(`${uri}/users/${member._id}`, updatedMember)
      .then(() => {
        console.log("Member Updated");
        setModalVisible(!modalVisible);
      })
      .catch((error) => {
        console.error("Error updating member: ", error.message);
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
            Updating {member.name}'s Information
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

const SearchMember = ({ navigation }) => {
  const [memberList, setMemberList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedDeleteMember, setSelectedDeleteMember] = useState(null);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setFilteredUsers(
      memberList.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${uri}/users/members`);
      setMemberList(response.data);
      setFilteredUsers(response.data);
      console.log("member Loaded");
    } catch (error) {
      console.error("Error fetching members: ", error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      fetchMembers();
    }
  }, [modalVisible]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${uri}/users/${id}`)
      .then(() => {
        console.log("Member Deleted");
        fetchMembers();
        setFilteredUsers(memberList);
        setSearchQuery("");
        handleSearch("");
        setConfirmModalVisible(false);
        setSelectedDeleteMember(null);
      })
      .catch((error) => {
        console.error("Error deleting member: ", error.message);
      });
  };

  const handleUpdate = (memberId) => {
    const memberToUpdate = memberList.find((member) => member._id === memberId);
    setSelectedMember(memberToUpdate);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update or Delete a Member</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by Name"
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
        autoCapitalize="none"
      />
      <ScrollView>
        {filteredUsers.map((member, idx) => (
          <View key={idx} style={styles.memberItem}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#0056b3" : "#007bff",
                  },
                  styles.button,
                ]}
                onPress={() => handleUpdate(member._id)}
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
                  setSelectedDeleteMember(member);
                }}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      {selectedMember && (
        <UpdateMemberModal
          member={selectedMember}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          fetchMembers={fetchMembers}
        />
      )}

      {selectedDeleteMember && (
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
                Are you sure you want to delete {selectedDeleteMember.name}?
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#9f3a38" : "#dc3545",
                    },
                    styles.button,
                  ]}
                  onPress={() => handleDelete(selectedDeleteMember._id)}
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

export default SearchMember;

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
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
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
