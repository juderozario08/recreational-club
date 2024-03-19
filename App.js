import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Member from "./screens/member/home";
import Coach from "./screens/coach/home";
import Treasurer from "./screens/treasurer/home";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        {/* Define screens or stacks for each role */}
        <Stack.Screen name="Member" component={Member} />
        <Stack.Screen name="Coach" component={Coach} />
        <Stack.Screen name="Treasurer" component={Treasurer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
