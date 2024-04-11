import React, { useEffect, useState, useCallback } from 'react'; // Import useCallback
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import uri from '../config/apiConfig';

const ClassesScreen = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');

  // Define the function to fetch classes outside of useEffect to be used with useFocusEffect
  const fetchClassesAndUserId = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
      const response = await axios.get(`${uri}/user-classes/${storedUserId}`);
      const classesWithPaymentStatus = response.data.map(classItem => ({
        ...classItem,
        hasPaid: classItem.attendees.some(attendee => attendee.user === storedUserId && attendee.hasPaid),
      }));
      setClasses(classesWithPaymentStatus);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
      Alert.alert("Error", "Failed to fetch classes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClassesAndUserId();
  }, [fetchClassesAndUserId]);

  // Use useFocusEffect to refresh classes every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchClassesAndUserId();
    }, [fetchClassesAndUserId])
  );

  const handlePayment = async (classId) => {
    try {
      // Simulate payment process
      console.log(`Paying for class: ${classId}`);
      // After payment, update the local state to reflect the payment status
      const updatedClasses = classes.map(classItem => {
        if (classItem._id === classId) {
          return { ...classItem, hasPaid: true }; // Update hasPaid status to true
        }
        return classItem;
      });
      setClasses(updatedClasses);
      // You should also send a request to your backend to update the payment status
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const renderClass = ({ item }) => (
    <View style={styles.classItem}>
      <Text style={styles.classTitle}>{item.title}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Button
        title={item.hasPaid ? "Paid" : "Pay"}
        onPress={() => handlePayment(item._id)}
        disabled={item.hasPaid}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, Member!</Text>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <FlatList
            data={classes}
            renderItem={renderClass}
            keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
          />
          <Button
            title="Rest of Classes"
            onPress={() => navigation.navigate('EnrollScreen')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
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
});

export default ClassesScreen;
