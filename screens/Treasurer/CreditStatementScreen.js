import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useState } from "react";

const CreditStatement = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [unpaidCoachExpenses, setUnpaidCoachExpenses] = useState(0);
  const [unpaidHallExpenses, setUnpaidHallExpenses] = useState(0);
  const [accountPayables, setAccountPayables] = useState(0);

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
export default CreditStatement;

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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
});
