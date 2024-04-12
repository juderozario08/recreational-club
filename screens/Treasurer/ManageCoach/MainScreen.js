import axios from "axios";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import uri from "../../../config/apiConfig";

const MainScreen = ({ navigation }) => {
  const [coachList, setCoachList] = useState([]);
  const [manageClassModal, setManageClassModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [classList, setClassList] = useState([]);

  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${uri}/users/coaches`);
      const coachesData = response.data.map((coach) => ({
        ...coach,
        classes: [],
      }));
      setCoachList(coachesData);
    } catch (error) {
      console.error("Error fetching coaches: ", error.message);
    }
  };

  const fetchClass = async () => {
    try {
      const response = await axios.get(`${uri}/classes`);
      setClassList(response.data);
    } catch (error) {
      console.error("Error fetching classes: ", error.message);
    }
  };

  const handleCoachClassPress = (coach) => {
    console.log("Coach Class Pressed");
    setManageClassModal(true);
    const coachClasses = classList.filter(
      (classItem) => classItem.coach._id === coach._id
    );
    setSelectedCoach({ ...coach, classes: coachClasses });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCoaches();
      fetchClass();
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.heading}>Coach Management</Text>
      {coachList.map((coach, index) => (
        <View
          key={index}
          style={[styles.coachContainer, { justifyContent: "space-between" }]}
        >
          <Text style={styles.text}>{coach.name}</Text>
          <Pressable
            style={{
              alignSelf: "center",
              backgroundColor: "#007bff",
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
            onPress={() => handleCoachClassPress(coach)}
          >
            <Text style={{ color: "#FFFFFF" }}>Classes</Text>
          </Pressable>
        </View>
      ))}
      {selectedCoach && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={manageClassModal}
          onRequestClose={() => setManageClassModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { gap: 5 }]}>
              <Text style={styles.modalTitle}>Classes</Text>
              <Text style={{ textAlign: "center", padding: 10, fontSize: 16 }}>
                Number of Classes: {selectedCoach.classes.length}
              </Text>
              {selectedCoach.classes.map((classItem, index) => (
                <View key={index} style={styles.modalText}>
                  <Text style={{ textAlign: "center" }}>{classItem.title}</Text>
                </View>
              ))}
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#0056b3" : "#007bff",
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => setManageClassModal(false)}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#0056b3" : "#007bff",
          },
          styles.button,
        ]}
        onPress={() => navigation.navigate("AddCoach")}
      >
        <Text style={styles.buttonText}>Add Coach</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#0056b3" : "#007bff",
            marginTop: 10,
          },
          styles.button,
        ]}
        onPress={() => navigation.navigate("SearchCoach")}
      >
        <Text style={styles.buttonText}>Search Or Update Coach</Text>
      </Pressable>
      <Navbar navigateTo={navigation.navigate} />
    </ScrollView>
  );
};

const Navbar = ({ navigateTo }) => {
  const navElements = [
    { name: "Profile", color: false },
    { name: "Statement", color: false },
    { name: "Coaches", color: true },
    { name: "Members", color: false },
  ];

  const onPressTab = (tabName) => {
    if (tabName === "Profile") navigateTo("treasurerScreen");
    else if (tabName === "Statement") navigateTo("CreditStatement");
    else if (tabName === "Coaches") navigateTo("CoachManagement");
    else if (tabName === "Members") navigateTo("MemberManagement");
  };

  return (
    <View style={[styles.navbar, { position: "fixed", bottom: 0, left: 0 }]}>
      {navElements.map((element, index) => (
        <Pressable
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
        </Pressable>
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
    alignSelf: "center",
  },
  coachContainer: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  classesContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  classContainer: {
    padding: 8,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    marginBottom: 5,
  },
  textClasses: {
    fontSize: 16,
    color: "#333",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 10,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    textAlign: "center",
  },
});
