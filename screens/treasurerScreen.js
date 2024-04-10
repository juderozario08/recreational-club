import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import uri from "../config/apiConfig";

const Drawer = createDrawerNavigator();

const TreasurerScreen = () => {
  const coachList = useRef([]);
  const [memberList, setMemberList] = useState([]);
  const classes = useRef([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  });
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [unpaidCoachExpenses, setUnpaidCoachExpenses] = useState(0);
  const [unpaidHallExpenses, setUnpaidHallExpenses] = useState(0);
  const [accountPayables, setAccountPayables] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userid = await AsyncStorage.getItem("userId");
        const response = await axios.get(`${uri}/users/${userid}`);
        setUser(response.data);
        console.log("User Loaded");
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, []);
  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${uri}/users/coaches`);
      coachList.current = response.data;
      console.log("Coaches Loaded");
    } catch (e) {
      console.error("Error fetching coaches: ", e.message);
    }
  };
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${uri}/classes`);
      for (let i = 0; i < response.data.length; i++) {
        classes.current.push(response.data[i]);
        setIncome(income + response.data[i].cost);
      }
      console.log("Classes Loaded");
    } catch (e) {
      console.error("Error fetching classes: ", e.message);
    }
  };
  useEffect(() => {
    fetchCoaches();
    fetchClasses();
  }, [coachList, classes]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${uri}/users/members`);
        setMemberList(response.data);
        console.log("Members Loaded");
      } catch (e) {
        console.error("Error fetching members: ", e.message);
      }
    };
    fetchMembers();
  }, []);

  // Credit Statement Component
  const CreditStatement = () => {
    return (
      <ScrollView
        contentContainerStyle={[styles.container, { marginVertical: 10 }]}
      >
        {/* This is the view of the Income Statement of the Club */}
        <View style={styles.statementView}>
          <Text style={styles.heading}>Income Statement</Text>
          <Text style={styles.text}>Revenue: {income}</Text>
          <Text style={styles.text}>Expenses: {expenses}</Text>
          <Text style={[styles.text, styles.profit]}>
            Profit: {income - expenses}
          </Text>
        </View>
        {/* This is the Unpaid Debts Statement of the Club */}
        <View style={styles.statementView}>
          <Text style={styles.heading}>Unpaid Debts</Text>
          <Text style={styles.text}>
            Unpaid Coach Expenses: {unpaidCoachExpenses}
          </Text>
          <Text style={styles.text}>
            Unpaid Hall Expenses: {unpaidHallExpenses}
          </Text>
        </View>
        {/* This is the Account Payables Sections */}
        <View style={styles.statementView}>
          <Text style={styles.heading}>Account Payables</Text>
          <Text style={styles.text}>
            Current Month's Account Payables: {accountPayables}
          </Text>
        </View>
      </ScrollView>
    );
  };

  // Coach Management Component
  const CoachManagement = () => {
    const handleCoachPress = (coach) => {
      console.log("Coach Pressed");
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Coach Management</Text>
        {coachList.current.map((coach, index) => {
          return (
            <View key={index} style={styles.coachContainer}>
              <Pressable onPress={() => handleCoachPress(coach)}>
                <Text style={styles.text}>{coach.name}</Text>
              </Pressable>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginHorizontal: -5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {classes.current.map((cls, idx) => {
                  if (cls.coach._id === coach._id) {
                    return (
                      <View key={idx} style={styles.classContainer}>
                        <Text style={styles.textClasses}>{cls.title}</Text>
                      </View>
                    );
                  } else {
                    return null;
                  }
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  // Member Management Component
  const MemberManagement = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Member Management</Text>
        {memberList.map((member, index) => (
          <Text key={index} style={styles.text}>
            {member.name}
          </Text>
        ))}
      </ScrollView>
    );
  };

  const Profile = () => {
    return (
      <View style={styles.container}>
        {user ? (
          <View style={styles.profileView}>
            <Text style={styles.heading}>Profile</Text>
            <Text style={styles.text}>Name: {user.name}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>Address: {user.address}</Text>
            <Text style={styles.text}>Phone Number: {user.phoneNumber}</Text>
          </View>
        ) : (
          <Text style={styles.text}>Loading user data...</Text>
        )}
      </View>
    );
  };
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="CreditStatement" component={CreditStatement} />
      <Drawer.Screen name="CoachManagement" component={CoachManagement} />
      <Drawer.Screen name="MemberManagement" component={MemberManagement} />
    </Drawer.Navigator>
  );
};

export default TreasurerScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  statementView: {
    flex: 1,
    width: "80%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
    padding: 20,
    borderRadius: 10,
  },
  profileView: {
    width: "80%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
    padding: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  coachContainer: {
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    width: "90%",
    alignItems: "center",
  },
  coachPressable: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  textClasses: {
    fontSize: 13,
    textAlign: "center",
    color: "#333",
  },
  profit: {
    color: "green",
  },
  classContainer: {
    width: "40%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
