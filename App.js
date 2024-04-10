import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/Signup";
import EnrolScreen from "./screens/addClassScreen";
import AttendanceScreen from "./screens/attendanceScreen";
import CoachScreen from "./screens/coachScreen";
import ManageClassScreen from "./screens/manageClassesScreen";
import MemberScreen from "./screens/memberScreen";
import TreasurerScreen from "./screens/treasurerScreen";

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
        <Stack.Screen name="MemberScreen" component={MemberScreen} />
        <Stack.Screen name="CoachScreen" component={CoachScreen} />
        <Stack.Screen name="attendanceScreen" component={AttendanceScreen} />
        <Stack.Screen name="enrolScreen" component={EnrolScreen} />
        <Stack.Screen name="TreasurerScreen" component={TreasurerScreen} />
        <Stack.Screen name="manageClassesCoach" component={ManageClassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
