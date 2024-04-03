import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const MemberScreen = ({ userId }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes'); // Fetch all classes
        setClasses(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch classes');
      }
    };

    fetchClasses();
  }, []);

  const handlePayment = async (classId) => {
    // Implement payment logic here
    Alert.alert('Payment', `Paid $10 for Class ID: ${classId}`);
  };

  const handleEnrollment = async (classId) => {
    // Implement enrollment logic here
    Alert.alert('Enrollment', `Enrolled in Class ID: ${classId}`);
  };

  const isUserEnrolled = (classItem) => {
    return classItem.attendees.some(attendee => attendee.user === userId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Welcome, Member!</Text>
      {classes.map((classItem) => (
        <View key={classItem._id} style={styles.classBox}>
          <Text>{classItem.title} - {new Date(classItem.date).toLocaleDateString()}</Text>
          <Text>Coach: {classItem.coach.name}</Text>
          {isUserEnrolled(classItem) ? (
            <Button title="Pay $10" onPress={() => handlePayment(classItem._id)} />
          ) : (
            <Button title="Enroll" onPress={() => handleEnrollment(classItem._id)} />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  classBox: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  // Additional styles as needed
});

export default MemberScreen;
