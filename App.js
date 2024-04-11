import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/Signup';
import MemberScreen from './screens/memberScreen';
import CoachScreen from './screens/coachScreen';
import TreasurerScreen from './screens/treasurerScreen';
import ManageClassScreen from './screens/manageClassesScreen';
import ManageEnrollScreen from './screens/manageEnrollScreen';
import AttendanceScreen from './screens/attendanceScreen';
import EnrolScreen from './screens/addClassScreen';
import AddUserClassScreen from './screens/addUserstoClassScreen';
import EnrollScreen from './screens/enrollScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="memberScreen" component={MemberScreen} />
        <Stack.Screen name="coachScreen" component={CoachScreen} />
        <Stack.Screen name="addUserClassScreen" component={AddUserClassScreen} />
        <Stack.Screen name="attendanceScreen" component={AttendanceScreen} />
        <Stack.Screen name="enrolScreen" component={EnrolScreen} />
        <Stack.Screen name="TreasurerScreen" component={TreasurerScreen} />
        <Stack.Screen name="manageClassesCoach" component={ManageClassScreen} />
        <Stack.Screen name="manageClassesMember" component={ManageEnrollScreen} />
        <Stack.Screen name="EnrollScreen" component={EnrollScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
