import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import MemberHomeScreen from "./screens/MemberHomeScreen";
import CoachHomeScreen from "./screens/CoachHomeScreen";
import TreasurerHomeScreen from "./screens/TreasurerHomeScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Define screens or stacks for each role */}
        <Stack.Screen name="Member" component={MemberHomeScreen} />
        <Stack.Screen name="Coach" component={CoachHomeScreen} />
        <Stack.Screen name="Treasurer" component={TreasurerHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
