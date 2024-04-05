import { createDrawerNavigator } from "@react-navigation/drawer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import uri from "../config/apiConfig";
import { userid } from "./Login";

const Drawer = createDrawerNavigator();

// Income Statement Component
const IncomeStatement = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Income Statement</Text>
      <Text style={styles.text}>Revenue: {income}</Text>
      <Text style={styles.text}>Expenses: {expenses}</Text>
      <Text style={[styles.text, styles.profit]}>
        Profit: {income - expenses}
      </Text>
    </ScrollView>
  );
};

// Unpaid Debts Component
const UnpaidDebts = () => {
  const [unpaidCoachExpenses, setUnpaidCoachExpenses] = useState();
  const [unpaidHallExpenses, setUnpaidHallExpenses] = useState(300);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Unpaid Debts</Text>
      <Text style={styles.text}>
        Unpaid Coach Expenses: {unpaidCoachExpenses}
      </Text>
      <Text style={styles.text}>
        Unpaid Hall Expenses: {unpaidHallExpenses}
      </Text>
    </ScrollView>
  );
};

// Account Payables Component
const AccountPayables = () => {
  const [accountPayables, setAccountPayables] = useState(400);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Account Payables</Text>
      <Text style={styles.text}>
        Current Month's Account Payables: {accountPayables}
      </Text>
    </ScrollView>
  );
};

// Coach Management Component
const CoachManagement = () => {
  const [coachList, setCoachList] = useState([]);
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get(`${uri}/users/coaches`);
        console.log(response);
      } catch (e) {
        console.error("Error fetching coaches: ", e.message);
      }
    };
    fetchCoaches();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Coach Management</Text>
      {coachList.map((coach, index) => (
        <Text key={index} style={styles.text}>
          {coach.name}
        </Text>
      ))}
    </ScrollView>
  );
};

// Member Management Component
const MemberManagement = () => {
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${uri}/users/members`);
        setMemberList(response.data);
      } catch (e) {
        console.error("Error fetching coaches: ", e.message);
      }
    };
    fetchMembers();
  }, []);

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${uri}/users/${userid}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setUser(null);
      }
    };
    fetchUserData().then((r) => console.log("Fetched Treasurer Data"));
  }, [userid]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <>
          <Text style={styles.heading}>Profile</Text>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Address: {user.address}</Text>
          <Text style={styles.text}>Phone Number: {user.phoneNumber}</Text>
        </>
      ) : (
        <Text style={styles.text}>Loading user data...</Text>
      )}
    </ScrollView>
  );
};

const TreasurerScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="IncomeStatement" component={IncomeStatement} />
      <Drawer.Screen name="UnpaidDebts" component={UnpaidDebts} />
      <Drawer.Screen name="AccountPayables" component={AccountPayables} />
      <Drawer.Screen name="CoachManagement" component={CoachManagement} />
      <Drawer.Screen name="MemberManagement" component={MemberManagement} />
    </Drawer.Navigator>
  );
};

export default TreasurerScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  profit: {
    color: "green",
  },
});
