import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

export const getCurrentUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded; // This object contains the user data
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};