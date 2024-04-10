import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import uri from '../config/apiConfig';

const EnrolScreen = () => {
  const [classes, setClasses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${uri}/classes`); // Replace with your API endpoint
      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const enrollInClass = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await axios.post(`${uri}/classes/${selectedClass._id}/users`, { userId: userId }); // Replace 'yourUserId' with the actual user ID
      setModalVisible(false);
      fetchClasses(); // Refresh the classes
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <FlatList
        data={classes}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.classItem} onPress={() => { setSelectedClass(item); setModalVisible(true); }}>
            <Text style={styles.classTitle}>{item.title}</Text>
            </TouchableOpacity>
        )}
        />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Enroll in {selectedClass?.title}?</Text>
            <Button title="Enroll" onPress={enrollInClass} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
    },
    classItem: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
      marginBottom: 10,
    },
    classTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    // ... rest of your styles
  });

export default EnrolScreen;