import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
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
        <Button
          title="Manage Classes"
          onPress={() => navigation.navigate('manageClassesCoach')}
        />
        <Button
          title="Check Attendance"
          onPress={() => navigation.navigate('attendanceScreen')}
        />
        <Button
          title="Notifications"
          onPress={() => navigation.navigate('NotificationScreen')}
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
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
});

export default CoachIntroScreen;
