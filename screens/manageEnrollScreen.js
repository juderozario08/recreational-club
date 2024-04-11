import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, ScrollView, StyleSheet } from 'react-native';
import * as ClassService from '../services/classService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uri from '../config/apiConfig';
import axios from 'axios';


const ManageClassesScreen = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState({ title: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${uri}/classes`)
      .then(response => {
        setClasses(response.data); // Directly set the fetched classes to state
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch classes:', error);
        setError('Failed to fetch classes');
        setIsLoading(false);
      });
  }, []);

  
  const handleCreateOrUpdate = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      console.error("User ID not found.");
      return;
    }
    

    // If the class exists, enroll the current user
    if (existingClass) {
      enrollUserInClass(existingClass, userId);
    } else {
      // If the class does not exist, create the class
      createClass();
    }
    try {
      const response = await axios.post(`${uri}/classes/${existingClass.id}/users`, {
        userId: userId, // Replace with the actual current user's ID
      });

      if (response.status === 200) {
        alert('Successfully enrolled in class');
      } else {
        alert('Failed to enroll in class');
      }
    } catch (error) {
      console.error('Failed to enroll in class1:', error);
      alert('Failed to enroll in class2');
    }

  resetModal();
};

  const handleDelete = async (id) => {
    try {
      await ClassService.deleteClass(id);
      loadClasses();
    } catch (error) {
      console.error('Failed to delete class:', error);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setCurrentClass({ title: '', date: '' });
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
        onChangeText={(text) => setCurrentClass(prevState => ({ ...prevState, title: text }))}
        value={currentClass.title}
        placeholder="Class Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCurrentClass(prevState => ({ ...prevState, date: text }))}
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
      <Button title="Enroll in Class" onPress={() => setIsModalOpen(true)} />
      <FlatList
        data={classes}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <View style={styles.classItem}>
            <Text>{item.title}</Text>
            <Text>Date: {item.date}</Text>
            <View style={styles.buttons}>
              <Button title="" onPress={() => openEditModal(item)} />
              <Button title="" onPress={() => handleDelete(item.id)} color="#ff0000" />
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
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  modalView: {
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ManageClassesScreen;


