import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uri from "../config/apiConfig";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MemberScreen = ({ userId }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.get(`${uri}/user-classes/${userId}`);
        setClasses(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch classes for user");
      }
    };

    fetchClasses();
  }, [userId]); // Added userId as a dependency to refetch if it changes

  const handlePayment = async (classId) => {
    // Implement payment logic here
    Alert.alert("Payment", `Paid $10 for Class ID: ${classId}`);
  };

  const handleEnrollment = async (classId) => {
    // Implement enrollment logic here
    Alert.alert("Enrollment", `Enrolled in Class ID: ${classId}`);
  };

  const isUserEnrolled = (classItem) => {
    return classItem.attendees.some((attendee) => attendee.user === userId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Welcome, Member!</Text>
      {classes.map((classItem) => (
        <View key={classItem._id} style={styles.classBox}>
          <Text>
            {classItem.title} - {new Date(classItem.date).toLocaleDateString()}
          </Text>
          <Text>Coach: {classItem.coach.name}</Text>
          {isUserEnrolled(classItem) ? (
            <Button
              title="Pay $10"
              onPress={() => handlePayment(classItem._id)}
            />
          ) : (
            <Button
              title="Enroll"
              onPress={() => handleEnrollment(classItem._id)}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  classBox: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  // Additional styles as needed
});

export default MemberScreen;
