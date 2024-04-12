import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import uri from "../../config/apiConfig";
import { updateClass } from "../../services/classService";

const CreditStatement = ({ navigation }) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [unpaidCoachExpenses, setUnpaidCoachExpenses] = useState(0);
  const [unpaidHallExpenses, setUnpaidHallExpenses] = useState(1000);
  const [accountPayables, setAccountPayables] = useState(0);
  const [payments, setPayments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [coachList, setCoachList] = useState([]);

  // Fetch the data from the server
  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${uri}/payments`);
      setPayments(response.data);
      setIncome(response.data.length * 10);
    } catch {
      console.log("Error fetching payments");
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${uri}/classes`);
      setClasses(response.data);

      let coachExpenses = 0;
      let hallExpenses = 0;

      for (let i = 0; i < response.data.length; i++) {
        const attendeesCount = response.data[i].attendees.length;
        coachExpenses += attendeesCount * 3.5;
        hallExpenses += attendeesCount * 5;
      }

      setUnpaidCoachExpenses(coachExpenses);
      setUnpaidHallExpenses(hallExpenses);
    } catch {
      console.log("Error fetching classes");
    }
  };

  const fetchCoachList = async () => {
    axios
      .get(`${uri}/users/coaches`)
      .then((response) => {
        setCoachList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const payCoach = () => {
    if (unpaidCoachExpenses <= 0) {
      return;
    }
    setExpenses(expenses + unpaidCoachExpenses);
    setUnpaidCoachExpenses(0);
    setAccountPayables(unpaidHallExpenses);
  };
  const payHall = () => {
    if (unpaidHallExpenses <= 0) {
      return;
    }
    setExpenses(expenses + unpaidHallExpenses);
    setUnpaidHallExpenses(0);
    setAccountPayables(unpaidCoachExpenses);
  };

  useEffect(() => {
    setAccountPayables(unpaidCoachExpenses + unpaidHallExpenses);
  }, [unpaidCoachExpenses, unpaidHallExpenses]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPayments();
      fetchClasses();
      fetchCoachList();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* This is the view of the Income Statement of the Club */}
        <View style={styles.statementView}>
          <Text style={styles.heading}>Income Statement</Text>
          <Text style={styles.text}>Revenue: {income}</Text>
          <Text style={styles.text}>Expenses: {expenses}</Text>
          <Text
            style={[
              styles.text,
              income - expenses < 0 ? { color: "red" } : { color: "green" },
            ]}
          >
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
          <View style={{ flexDirection: "row" }}>
            <Pressable style={{ padding: 10 }} onPress={() => payCoach()}>
              <Text style={{ color: "blue" }}>Pay Coach</Text>
            </Pressable>
            <Pressable style={{ padding: 10 }} onPress={() => payHall()}>
              <Text style={{ color: "blue" }}>Pay Hall</Text>
            </Pressable>
          </View>
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
const Navbar = ({ navigateTo }) => {
  const [navElements] = useState([
    { name: "Profile", color: false },
    { name: "Statement", color: true },
    { name: "Coaches", color: false },
    { name: "Members", color: false },
  ]);

  const onPressTab = (tabName) => {
    if (tabName === "Profile") navigateTo("treasurerScreen");
    else if (tabName === "Statement") navigateTo("CreditStatement");
    else if (tabName === "Coaches") navigateTo("CoachManagement");
    else if (tabName === "Members") navigateTo("MemberManagement");
  };

  return (
    <View style={styles.navbar}>
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
    paddingBottom: 30,
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
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    width: "100%",
    zIndex: 1,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 10,
  },
});
