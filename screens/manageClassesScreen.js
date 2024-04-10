import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ClassService from "../services/classService";

const ManageClassesScreen = () => {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState({ title: "", date: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const response = await ClassService.fetchClasses();
        setClasses(response);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };
    loadClasses();
  }, []);

  const handleCreateOrUpdate = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    const classData = { ...currentClass, coach: userId };
    try {
      if (isEditing) {
        await ClassService.updateClass(editingClassId, classData);
      } else {
        await ClassService.createClass(classData);
      }
      resetModal();
      loadClasses();
    } catch (error) {
      console.error("Error processing class:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ClassService.deleteClass(id);
      loadClasses();
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setCurrentClass({ title: "", date: "" });
    setIsEditing(false);
    setEditingClassId(null);
  };

  const openEditModal = (item) => {
    setCurrentClass({ title: item.title, date: item.date });
    setIsEditing(true);
    setEditingClassId(item.id);
    setIsModalOpen(true);
  };

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
      <Button title="Add New Class" onPress={() => setIsModalOpen(true)} />
      <FlatList
        data={classes}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.classItem}>
            <Text>{item.title}</Text>
            <Text>Date: {item.date}</Text>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => openEditModal(item)} />
              <Button
                title="Delete"
                onPress={() => handleDelete(item.id)}
                color="#ff0000"
              />
            </View>
          </View>
        )}
      />
      <Modal visible={isModalOpen} animationType="slide">
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  classItem: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  modalView: {
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ManageClassesScreen;
