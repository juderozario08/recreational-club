import React, { useState } from 'react';
import { View, Button, Alert, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const MemberScreen = () => {
  const [amount, setAmount] = useState(''); // State to hold the payment amount

  const handlePayment = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    try {
      // Replace 'your_payment_api_endpoint' with your actual payment API endpoint
      const response = await axios.post('your_payment_api_endpoint', {
        amount: amount, // Send the amount to your backend
        // Add other necessary data here, e.g., user ID, payment method, etc.
      });

      // Handle the response from your backend
      console.log(response.data);
      Alert.alert('Payment Successful', `Paid $${amount}`);

      // Reset the amount after successful payment
      setAmount('');
    } catch (error) {
      console.error(error);
      Alert.alert('Payment Failed', 'Something went wrong with your payment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, Member!</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount} // Update the amount state when text changes
        placeholder="Enter payment amount"
        keyboardType="numeric" // Ensures that the keyboard is suitable for entering numbers
      />
      <Button
        title="Make Payment"
        onPress={handlePayment} // Call the handlePayment function when the button is pressed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20, // Add some space between the text and the input field
  },
  input: {
    width: '100%', // Make the input stretch to the container width
    height: 40,
    marginVertical: 8, // Add some vertical margin for spacing
    borderWidth: 1,
    padding: 10, // Padding inside the input for text
    borderRadius: 4, // Slightly round the corners of the input field
  },
});

export default MemberScreen;
