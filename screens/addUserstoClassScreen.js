import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import axios from "axios";
import uri from "../config/apiConfig";

const AddUserClassScreen = () => {
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);

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
      await axios.delete(`${uri}/classes/${classId}/users/${userId}`); // Replace with your API endpoint
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
        renderItem={({ item: classItem }) => (
          <View style={styles.classItem}>
            <Text style={styles.classTitle}>{classItem.title}</Text>
            {users
              .filter(
                (user) =>
                  !classItem.attendees.find(
                    (attendee) => attendee.user._id === user._id
                  )
              )
              .map((user) => (
                <View key={user._id} style={styles.userItem}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Button
                    title="Add to Class"
                    onPress={() => addUserToClass(classItem._id, user._id)}
                  />
                </View>
              ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  classItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  userName: {
    fontSize: 16,
  },
});

export default AddUserClassScreen;
