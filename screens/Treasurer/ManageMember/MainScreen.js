import axios from "axios";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import uri from "../../../config/apiConfig";

const MainScreen = ({ navigation }) => {
  const [memberList, setMemberList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const classList = useRef([]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${uri}/users/members`);
      const memberData = response.data.map((member) => ({
        ...member,
        classes: [],
      }));
      setMemberList(memberData);
      return memberData; // Return the member data
    } catch (e) {
      console.error("Error fetching members: ", e.message);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${uri}/classes`);
      const classesData = response.data;
      classList.current = classesData; // Update classList.current
      return classesData; // Return the classes data
    } catch (e) {
      console.error("Error fetching classes: ", e.message);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${uri}/payments`);
      // Process payment data and set state if needed
    } catch (e) {
      console.error("Error fetching payments: ", e.message);
    }
  };

  const organizeData = (members, classes) => {
    for (let i = 0; i < classes.length; i++) {
      const classAttendees = classes[i].attendees;
      for (let j = 0; j < classAttendees.length; j++) {
        const attendee = classAttendees[j];
        if (attendee.user) {
          // Check if attendee.user exists
          for (let k = 0; k < members.length; k++) {
            if (attendee.user._id === members[k]._id) {
              members[k].classes.push({
                coach: classes[i].coach,
                date: classes[i].date,
                title: classes[i].title,
                hasPaid: attendee.hasPaid,
                attended: attendee.attended,
              });
            }
          }
        }
      }
    }
    setMemberList([...members]); // Update memberList state
  };

  const fetchScreenData = useCallback(async () => {
    try {
      const [members, classes] = await Promise.all([
        fetchMembers(),
        fetchClasses(),
      ]);
      if (members && classes) {
        organizeData(members, classes);
      }
      fetchPayments();
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchScreenData();
    }, [fetchScreenData])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchMembers();
      fetchClasses();
      fetchPayments();
    }, [])
  );

  const handleClassBtnPress = (member) => {
    setSelectedMember(member);
    setIsModal(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Member Management</Text>
      {memberList.map((member, index) => (
        <View key={index} style={styles.memberView}>
          <Text style={styles.text}>{member.name}</Text>
          <Pressable
            style={styles.memberBtn}
            onPress={() => handleClassBtnPress(member)}
          >
            <Text style={{ color: "#fff" }}>Classes</Text>
          </Pressable>
        </View>
      ))}
      {selectedMember && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModal}
          onRequestClose={() => setIsModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Classes</Text>
              <ScrollView
                contentContainerStyle={{
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                {selectedMember.classes.map((cls, idx) => (
                  <View
                    key={idx}
                    style={{
                      width: "90%",
                      backgroundColor: "#cccccc",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        paddingBottom: 10,
                      }}
                    >
                      {cls.title}
                    </Text>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.modalText}>
                        Coach: {cls.coach.name}
                      </Text>
                      {cls.hasPaid ? (
                        <Text style={[styles.modalText, { color: "green" }]}>
                          Paid
                        </Text>
                      ) : (
                        <Text style={[styles.modalText, { color: "red" }]}>
                          Not Paid
                        </Text>
                      )}
                      {cls.attended ? (
                        <Text style={[styles.modalText, { color: "green" }]}>
                          Attended
                        </Text>
                      ) : (
                        <Text style={[styles.modalText, { color: "red" }]}>
                          Not Attended
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
              <Pressable
                style={styles.closeButton}
                onPress={() => setIsModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#0056b3" : "#007bff",
            marginTop: 10,
          },
          styles.button,
        ]}
        onPress={() => navigation.navigate("AddMember")}
      >
        <Text style={styles.buttonText}>Add Member</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#0056b3" : "#007bff",
            marginTop: 10,
          },
          styles.button,
        ]}
        onPress={() => navigation.navigate("SearchMember")}
      >
        <Text style={styles.buttonText}>Search Or Update Member</Text>
      </Pressable>
      <Navbar navigateTo={navigation.navigate} />
    </ScrollView>
  );
};

const Navbar = ({ navigateTo }) => {
  const navElements = [
    { name: "Profile", color: false },
    { name: "Statement", color: false },
    { name: "Coaches", color: false },
    { name: "Members", color: true },
  ];

  const onPressTab = (tabName) => {
    if (tabName === "Profile") navigateTo("treasurerScreen");
    else if (tabName === "Statement") navigateTo("CreditStatement");
    else if (tabName === "Coaches") navigateTo("CoachManagement");
    else if (tabName === "Members") navigateTo("MemberManagement");
  };
  return (
    <View style={[styles.navbar, { position: "absolute", bottom: 0, left: 0 }]}>
      {navElements.map((element, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => onPressTab(element.name)}
        >
          <Text
            style={{
              color: element.color ? "#007bff" : "#aaa",
            }}
          >
            {element.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    width: "100%",
  },
  tab: {
    alignItems: "center",
    paddingVertical: 10,
  },
  memberView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  memberBtn: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  modalText: {
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});
