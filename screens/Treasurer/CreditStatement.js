import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const CreditStatement = ({ navigation }) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [unpaidCoachExpenses, setUnpaidCoachExpenses] = useState(0);
  const [unpaidHallExpenses, setUnpaidHallExpenses] = useState(0);
  const [accountPayables, setAccountPayables] = useState(0);
  const navElements = [
    { name: "Profile", color: false },
    { name: "Statement", color: true },
    { name: "Coaches", color: false },
    { name: "Members", color: false },
  ];
  const Navbar = ({ navigateTo }) => {
    const onPressTab = (tabName) => {
      if (tabName === "Profile") navigateTo("treasurerScreen");
      else if (tabName === "Statement") navigateTo("CreditStatement");
      else if (tabName === "Coaches") navigateTo("CoachManagement");
      else if (tabName === "Members") navigateTo("MemberManagement");
    };
    return (
      <View
        style={[styles.navbar, { position: "absolute", bottom: 0, left: 0 }]}
      >
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
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
      <Navbar navigateTo={navigation.navigate} />
    </View>
  );
};
export default CreditStatement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 120, // Adjust according to the height of the Navbar
  },
  statementView: {
    width: "90%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  profit: {
    color: "#0c0", // Green color for profit
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
});
