import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uri from '../config/apiConfig'; // Adjust this to your API's base URL

const EnrollScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchClassesAndUserId = async () => {
      setIsLoading(true);
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId); // Store the userId for later use
        await fetchClasses(storedUserId);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassesAndUserId();
  }, []);

  const fetchClasses = async (userId) => {
    try {
      const response = await axios.get(`${uri}/!user-classes/${userId}`);
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to refresh classes:', error);
      Alert.alert("Error", "Failed to refresh classes. Please try again later.");
    }
  };

  const addUserToClass = async (classId, userId) => {
    try {
      await axios.post(`${uri}/classes/${classId}/users`, { userId }); // Send a POST request to add the user to the class
      Alert.alert("Enrollment Successful", "You have been enrolled in the class.");
      fetchClasses(userId); // Refresh the list of classes
    } catch (error) {
      console.error('Error enrolling in class:', error);
      Alert.alert("Enrollment Failed", "Failed to enroll in the class. Please try again.");
    }
  };

  const handleEnroll = (classId) => {
    addUserToClass(classId, userId);
  };

  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <Text style={styles.classTitle}>{item.title}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Button
        title="Enroll"
        onPress={() => handleEnroll(item._id)} // Use the class ID to enroll the user
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enroll in a Class</Text>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={classes}
          renderItem={renderClassItem}
          keyExtractor={item => item._id.toString()}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Back to Member Screen"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  classItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    // Additional styling for the button container as needed
  },
  // Add more styles as needed
});

export default EnrollScreen;
