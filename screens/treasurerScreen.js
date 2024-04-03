import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import axios from "axios";
import uri from "../config/apiConfig";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        role: 'Treasurer',
    });
    const [error, setError] = useState(''); // Add state to track the error message
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Profile</Text>
            <Text>Name: {userInfo.name}</Text>
            <Text>Email: {userInfo.email}</Text>
            <Text>Role: {userInfo.role}</Text>
        </View>
    );
}

// Income Statement Component
const IncomeStatement = () => {
    // Sample data for income and expenses
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Income Statement</Text>
            <Text>Revenue: {income}</Text>
            <Text>Expenses: {expenses}</Text>
            <Text>Profit: {income - expenses}</Text>
        </View>
    );
};

// Unpaid Debts Component
const UnpaidDebts = () => {
    // Sample data for unpaid debts
    const [unpaidCoachExpenses, setUnpaidCoachExpenses] = useState(200);
    const [unpaidHallExpenses, setUnpaidHallExpenses] = useState(300);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Unpaid Debts</Text>
            <Text>Unpaid Coach Expenses: {unpaidCoachExpenses}</Text>
            <Text>Unpaid Hall Expenses: {unpaidHallExpenses}</Text>
        </View>
    );
};

// Account Payables Component
const AccountPayables = () => {
    // Sample data for account payables
    const [accountPayables, setAccountPayables] = useState(400);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Account Payables</Text>
            <Text>Current Month's Account Payables: {accountPayables}</Text>
        </View>
    );
};

// Coach Management Component
const CoachManagement = () => {
    // Sample data for coach list
    const [coachList, setCoachList] = useState(['Coach 1', 'Coach 2', 'Coach 3']);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Coach Management</Text>
            {coachList.map((coach, index) => (
                <Text key={index}>{coach}</Text>
            ))}
        </View>
    );
};

// Member Management Component
const MemberManagement = () => {
    // Sample data for member list
    const [memberList, setMemberList] = useState(['Member 1', 'Member 2', 'Member 3']);
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Member Management</Text>
            {memberList.map((member, index) => (
                <Text key={index}>{member}</Text>
            ))}
        </View>
    );
};

// Drawer Navigator
const Drawer = createDrawerNavigator();
const TreasurerScreen = () => {
    return (
        <Drawer.Navigator initialRouteName="Profile" screenOptions={{headerShown: true}}>
            <Drawer.Screen name="Profile" component={Profile}/>
            <Drawer.Screen name="IncomeStatement" component={IncomeStatement}/>
            <Drawer.Screen name="UnpaidDebts" component={UnpaidDebts}/>
            <Drawer.Screen name="AccountPayables" component={AccountPayables}/>
            <Drawer.Screen name="CoachManagement" component={CoachManagement}/>
            <Drawer.Screen name="MemberManagement" component={MemberManagement}/>
        </Drawer.Navigator>
    );
};

export default TreasurerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    drawerItem: {
        padding: 10,
        backgroundColor: '#eee',
        marginBottom: 1,
    },
});

