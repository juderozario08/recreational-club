import AddCoach from "./AddCoach";
import MainScreen from "./MainScreen";
import SearchCoach from "./SearchCoach";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const CoachManagement = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="AddCoach" component={AddCoach} />
      <Stack.Screen name="SearchCoach" component={SearchCoach} />
    </Stack.Navigator>
  );
};

export default CoachManagement;
