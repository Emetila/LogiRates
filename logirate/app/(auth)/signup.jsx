import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useState} from "react";
import axios from 'axios'

export default function SignUp() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://your-api-url.com/api/signup', {
        name,
        email,
        password
      });

      console.log('Signup response:', response.data);
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      Alert.alert('Signup failed', error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
    return(
        <SafeAreaView>
            <Text>This is the signup page</Text>
        </SafeAreaView>
    )
}