import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

// Dummy data for upcoming classes
const DUMMY_CLASSES = [
  { id: '1', title: 'Morning Yoga', date: '2023-10-05T08:00:00Z' },
  { id: '2', title: 'Advanced Pilates', date: '2023-10-06T09:00:00Z' },
  // Add more classes as needed
];

const CoachIntroScreen = ({ navigation }) => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    // Ideally, fetch the actual upcoming classes from the backend
    setUpcomingClasses(DUMMY_CLASSES);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.classItem}>
      <Text style={styles.classTitle}>{item.title}</Text>
      <Text>{new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, Coach!</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Classes</Text>
        <FlatList
          data={upcomingClasses}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Manage Classes"
            onPress={() => navigation.navigate('ManageClassesScreen')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Check Attendance"
            onPress={() => navigation.navigate('AttendanceScreen')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Notifications"
            onPress={() => navigation.navigate('NotificationScreen')} // Replace with your actual navigation destination
          />
        </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  button: {
    marginBottom: 10, // This adds space between the buttons
  },
});

export default CoachIntroScreen;

