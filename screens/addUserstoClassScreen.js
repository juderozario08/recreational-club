import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import uri from '../config/apiConfig';

const AddUserClassScreen = () => {
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchClasses();
    fetchUsers();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${uri}/classes`); // Replace with your API endpoint
      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${uri}/users`); // Replace with your API endpoint
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUserToClass = async (classId, userId) => {
    try {
      await axios.post(`${uri}/classes/${classId}/users`, { userId }); // Replace with your API endpoint
      fetchClasses(); // Refresh the classes
    } catch (error) {
      console.error(error);
    }
  };

  const removeUserFromClass = async (classId, userId) => {
    try {
      await axios.put(`${uri}/classes/${classId}/users`, { userId }); // Assuming your API endpoint extracts userId from the URL
      fetchClasses(); // Refresh the classes
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <FlatList
        style={{ height: 'calc(100vh - 100px)' }}
        data={classes}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item: classItem }) => (
          <View style={styles.classItem}>
            <Text style={styles.classTitle}>{classItem.title}</Text>
            {users.map((user) => {
              const isUserAdded = classItem.attendees.some(attendee => attendee._id.toString() === user._id);
              
              return (
                <View key={user._id} style={styles.userItem}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      onPress={() => addUserToClass(classItem._id, user._id)}
                      disabled={isUserAdded}
                      style={[styles.button, isUserAdded && styles.disabledButton]}
                    >
                      <Text style={styles.buttonText}>Add to Class</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeUserFromClass(classItem._id, user._id)}
                      disabled={!isUserAdded}
                      style={[styles.button, !isUserAdded && styles.disabledButton]}
                    >
                      <Text style={styles.buttonText}>Remove from Class</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      />
      <View style={styles.backButtonContainer}>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    height: '100vh',
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
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  userName: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  backButtonContainer: {
    paddingBottom: 20, // Adds some padding at the bottom
  },
});

export default AddUserClassScreen;