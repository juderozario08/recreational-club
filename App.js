import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/Signup';
import MemberScreen from './screens/memberScreen';
import CoachScreen from './screens/coachScreen';
import TreasurerScreen from './screens/treasurerScreen';
import ManageClassScreen from './screens/manageClassesScreen';
import AttendanceScreen from './screens/attendanceScreen';
import EnrolScreen from './screens/addClassScreen';
import AddUserClassScreen from './screens/addUserstoClassScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="memberScreen" component={MemberScreen} />
        <Stack.Screen name="coachScreen" component={CoachScreen} />
        <Stack.Screen name="addUserClassScreen" component={AddUserClassScreen} />
        <Stack.Screen name="attendanceScreen" component={AttendanceScreen} />
        <Stack.Screen name="enrolScreen" component={EnrolScreen} />
        <Stack.Screen name="treasurerScreen" component={TreasurerScreen} />
        <Stack.Screen name="manageClassesCoach" component={ManageClassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
