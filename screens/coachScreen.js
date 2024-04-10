import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import uri from '../config/apiConfig'; // Make sure this points to your API's base URL

const CoachIntroScreen = ({ navigation }) => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${uri}/classes`)
      .then(response => {
        setUpcomingClasses(response.data); // Directly set the fetched classes to state
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch classes:', error);
        setError('Failed to fetch classes');
        setIsLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.classItem}>
      <Text style={styles.classTitle}>{item.title}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, Coach!</Text>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={upcomingClasses}
          renderItem={renderItem}
          keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
        />
      )}
      <View style={styles.buttonContainer}>
        {/* Use TouchableOpacity for custom button styling */}
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('manageClassesCoach')}>
          <Text style={styles.buttonText}>Create/Edit Classes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('attendanceScreen')}>
          <Text style={styles.buttonText}>Check Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('addUserClassScreen')}>
          <Text style={styles.buttonText}>Add Users To Class</Text>
        </TouchableOpacity>
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
    marginTop: 20,
  },
  buttonStyle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Example text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
});

export default CoachIntroScreen;
