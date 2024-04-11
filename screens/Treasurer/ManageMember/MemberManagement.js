import AddMember from "./AddMember";
import MainScreen from "./MainScreen";
import SearchMember from "./SearchMember";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MemberManagement = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="AddMember" component={AddMember} />
      <Stack.Screen name="SearchMember" component={SearchMember} />
    </Stack.Navigator>
  );
};

export default MemberManagement;
