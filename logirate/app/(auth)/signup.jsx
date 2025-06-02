import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import axios from "axios";
import authStyles from "./styles";
import Colors from "../../constants/Colors";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Validation Error", "Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://your-api-url.com/api/signup", {
        name,
        email,
        password,
      });

      console.log("Signup response:", response.data);
      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      Alert.alert(
        "Signup failed",
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={authStyles.container}>
      <View style={authStyles.textBox}>
        <Text
          style={{
            color: Colors.primary,
            fontFamily: "PoppinsBold",
            fontSize: 24,
            fontWeight: "800",
            lineHeight: 24,
          }}
        >
          Hello there!
        </Text>
        <Text
          style={{
            fontFamily: "PoppinsRegular",
            fontSize: 16,
            fontWeight: "400",
            color: Colors.primary,
          }}
        >
          Let&apos;s get you ready for a ride!
        </Text>

        <View style={authStyles.secContainer}>
          <View style={authStyles.formContainer}>
            <Text style={authStyles.formText}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={authStyles.input}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
