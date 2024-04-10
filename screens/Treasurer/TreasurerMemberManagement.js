import axios from "axios";
import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import uri from "../../config/apiConfig";

const MemberManagement = () => {
  const memberList = useRef([]);
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${uri}/users/members`);
      memberList.current = response.data;
      console.log("Members Loaded");
    } catch (e) {
      console.error("Error fetching members: ", e.message);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, [memberList]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Member Management</Text>
      {memberList.current.map((member, index) => (
        <Text key={index} style={styles.text}>
          {member.name}
        </Text>
      ))}
    </ScrollView>
  );
};

export default MemberManagement;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
