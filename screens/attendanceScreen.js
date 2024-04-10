import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import uri from '../config/apiConfig';

const AttendanceScreen = () => {
    const [classes, setClasses] = useState([]);

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
  
    const markAttendance = async (classId, userId) => {
      try {
        await axios.put(`${uri}/classes/${classId}/attendance`, { userId }); // Replace with your API endpoint
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
              <View style={styles.classItem}>
                <Text style={styles.classTitle}>{item.title}</Text>
                {item.attendees.map((attendee) => (
                  <View key={attendee.user._id} style={styles.attendeeItem}>
                    <Text style={styles.attendeeName}>{attendee.user.name}</Text>
                    <Button title="Mark Attendance" onPress={() => markAttendance(item._id, attendee.user._id)} />
                  </View>
                ))}
              </View>
            )}
          />
        </View>
      );}
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 10,
          backgroundColor: '#f5f5f5',
        },
        classItem: {
          marginBottom: 20,
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 5,
        },
        classTitle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        attendeeItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        },
        attendeeName: {
          fontSize: 16,
        },
      });

export default AttendanceScreen;