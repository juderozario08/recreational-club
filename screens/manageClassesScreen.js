import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uri from "../config/apiConfig"; // Make sure this points to your API's base URL

// Ensure this path is correct and points to your actual service file
import * as ClassService from "../services/classService";

const ManageClassesScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentClass, setCurrentClass] = useState({ title: "", date: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Replace this axios call with your ClassService method if available
        const response = await axios.get(`${uri}/classes`);
        setClasses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
        setError("Failed to fetch classes");
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleCreateOrUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found.");
        return;
      }

      // Attach the coach's user ID to the class data
      const classDataWithCoach = { ...currentClass, coach: userId };

      if (isEditing) {
        // If editing, include the coach ID in the update (if your API requires it)
        const response = await ClassService.updateClass(
          editingClassId,
          classDataWithCoach
        );
        // Update your frontend state as necessary, e.g., update the class in the list of classes
        const updatedClasses = classes.map((cls) =>
          cls._id === editingClassId ? { ...response.data, coach: userId } : cls
        );
        setClasses(updatedClasses);
      } else {
        // If adding a new class, include the coach ID
        const response = await ClassService.createClass(classDataWithCoach);
        // Add the new class to your frontend state, including the returned data which should now include the coach ID
        setClasses([...classes, { ...response.data, coach: userId }]);
      }
      resetModal();
    } catch (error) {
      console.error("Error processing class:", error);
      // Optionally, handle errors in your UI
    }
  };

  const handleDelete = async (classId) => {
    try {
      await ClassService.deleteClass(classId);
      const updatedClasses = classes.filter((cls) => cls._id !== classId);
      setClasses(updatedClasses);
    } catch (error) {
      console.error("Failed to delete class:", error);
      // Optionally, update your state to show an error message to the user
    }
  };

  const openEditModal = (item) => {
    setCurrentClass({ title: item.title, date: item.date });
    setIsEditing(true);
    setEditingClassId(item._id); // or item.id based on your data structure
    setModalVisible(true);
  };

  const resetModal = () => {
    setCurrentClass({ title: "", date: "" });
    setIsEditing(false);
    setEditingClassId(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openEditModal(item)}
      style={styles.classItem}
    >
      <Text style={styles.classTitle}>{item.title}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
  const renderModalContent = () => (
    <ScrollView style={styles.modalView}>
      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setCurrentClass((prevState) => ({ ...prevState, title: text }))
        }
        value={currentClass.title}
        placeholder="Class Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setCurrentClass((prevState) => ({ ...prevState, date: text }))
        }
        value={currentClass.date}
        placeholder="Class Date (YYYY-MM-DD)"
      />
      <Button
        title={isEditing ? "Update Class" : "Add Class"}
        onPress={handleCreateOrUpdate}
      />
      <Button title="Cancel" onPress={resetModal} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Class Management</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={classes}
            eeyExtractor={(item, index) =>
              item._id ? item._id.toString() : index.toString()
            }
          />
        )}
        <Button title="Add New Class" onPress={() => setModalVisible(true)} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={resetModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setCurrentClass((prevState) => ({
                    ...prevState,
                    title: text,
                  }))
                }
                value={currentClass.title}
                placeholder="Class Title"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setCurrentClass((prevState) => ({ ...prevState, date: text }))
                }
                value={currentClass.date}
                placeholder="Class Date (YYYY-MM-DD)"
              />
              <View style={styles.buttonContainer}>
                <Button
                  title={isEditing ? "Update Class" : "Add Class"}
                  onPress={handleCreateOrUpdate}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={resetModal} />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This works if the app container has a defined height
    height: "100vh", // Explicitly setting the height for the web
    overflowY: "auto", // Ensure scrolling is enabled
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  classItem: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background for the modal overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: 250, // Specify width to ensure consistency
    padding: 10,
  },
  buttonContainer: {
    width: "100%", // or any specific size you want
    height: 50, // or any specific size you want
    margin: 2.5,
  },
  error: {
    color: "red",
  },
});

export default ManageClassesScreen;
