import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/Signup";
import EnrolScreen from "./screens/addClassScreen";
import AttendanceScreen from "./screens/attendanceScreen";
import CoachScreen from "./screens/coachScreen";
import ManageClassScreen from "./screens/manageClassesScreen";
import MemberScreen from "./screens/memberScreen";

import TreasurerScreen from "./screens/Treasurer/TreasurerScreen";
import CreditStatement from "./screens/Treasurer/CreditStatementScreen";
import CoachManagement from "./screens/Treasurer/TreasurerMemberManagement";
import MemberManagement from "./screens/Treasurer/TreasurerCoachManagement";

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
        <Stack.Screen name="treasurerScreen" component={TreasurerScreen} />
        <Stack.Screen name="attendanceScreen" component={AttendanceScreen} />
        <Stack.Screen name="enrolScreen" component={EnrolScreen} />
        <Stack.Screen
          name="creditManagementScreen"
          component={CreditStatementScreen}
        />
        <Stack.Screen
          name="coachManagementScreen"
          component={CoachManagement}
        />
        <Stack.Screen
          name="memberManagementScreen"
          component={MemberManagement}
        />
        <Stack.Screen name="manageClassesCoach" component={ManageClassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
