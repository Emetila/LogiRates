import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import authStyles from "../(home)/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authStyle from "./style";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Input Handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // ✅ Form Validation
  const validateForm = () => {
    const newErrors = {};
    const { firstName, surname, email, password, confirmPassword } = formData;

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!surname.trim()) newErrors.surname = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!isChecked)
      newErrors.terms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Signup Handler
  const handleSignup = async () => {
    if (!validateForm()) return;

    const { email, password } = formData;

    try {
      const existingUsers = await AsyncStorage.getItem("users");
      const parsedUsers = existingUsers ? JSON.parse(existingUsers) : [];

      const isEmailTaken = parsedUsers.some(
        (user) => user.email.toLowerCase().trim() === email.toLowerCase().trim()
      );

      if (isEmailTaken) {
        Alert.alert("Signup Failed", "Email already exists.");
        return;
      }

      const newUser = {
        email: email.trim(),
        password: password,
      };

      parsedUsers.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(parsedUsers));

      Alert.alert("Signup Successful!", "You can now log in.", [
        { text: "OK", onPress: () => router.push("/login") },
      ]);
    } catch (err) {
      console.error("Signup error:", err);
      Alert.alert("Signup failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={authStyles.textBox}>
          <Text
            style={{
              color: "#3B3C3D",
              fontFamily: "PoppinsBold",
              fontSize: 32,
              fontWeight: "800",
              lineHeight: 24,
              letterSpacing: -1.6,
            }}
          >
            Hello!
          </Text>
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              fontSize: 14,
              fontWeight: "400",
              color: Colors.text,
              letterSpacing: -0.28,
            }}
          >
            Let&apos;s get you ready for a ride!
          </Text>

          <View style={authStyles.secContainer}>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>First Name</Text>
              <View style={{ position: "relative" }}>
                <FontAwesome6
                  style={authStyle.icon2}
                  name="user-large"
                  size={24}
                  color="#00A1BF"
                />
                <TextInput
                  label="full name"
                  mode="outlined"
                  // error={!!errors.firstName}
                  value={formData.firstName}
                  onChangeText={(value) => {
                    handleInputChange("firstName", value);
                  }}
                  style={[
                    authStyles.input2,
                    errors.firstName && { borderColor: "red" },
                  ]}
                  cursorColor={Colors.primary}
                />
                {errors.firstName && (
                  <Text style={authStyles.error}>{errors.firstName}</Text>
                )}
              </View>
            </View>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Surname</Text>
              <View style={{ position: "relative" }}>
                <FontAwesome6
                  style={authStyle.icon2}
                  name="user-large"
                  size={24}
                  color="#00A1BF"
                />
                <TextInput
                  label="full name"
                  mode="outlined"
                  error={!!errors.surname}
                  value={formData.surname}
                  onChangeText={(value) => {
                    handleInputChange("surname", value);
                  }}
                  style={[
                    authStyles.input2,
                    errors.surname && { borderColor: "red" },
                  ]}
                  cursorColor={Colors.primary}
                />
                {errors.surname && (
                  <Text style={authStyles.error}>{errors.surname}</Text>
                )}
              </View>
            </View>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Email/Mobile</Text>
              <View style={{ position: "relative" }}>
                <MaterialCommunityIcons
                  style={authStyle.icon2}
                  name="email"
                  size={24}
                  color="#00A1BF"
                />
                <TextInput
                  mode="outlined"
                  label="email"
                  value={formData.email}
                  onChangeText={(value) => {
                    handleInputChange("email", value);
                  }}
                  autoCorrect={false}
                  style={[
                    authStyles.input2,
                    errors.email && { borderColor: "red" },
                  ]}
                  contentStyle={{ paddingLeft: 40 }}
                  cursorColor={Colors.primary}
                  keyboardType="email-address"
                  error={!!errors.email}
                />
                {errors.email && (
                  <Text style={authStyles.error}>{errors.email}</Text>
                )}
              </View>
            </View>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Password</Text>
              <TextInput
                value={formData.password}
                onChangeText={(value) => {
                  handleInputChange("password", value);
                }}
                style={[
                  authStyle.input2,
                  errors.password && { borderColor: "red" },
                ]}
                secureTextEntry={!passwordShow}
                cursorColor={Colors.primary}
                mode="outlined"
                label="password"
                error={!!errors.password}
              />
              {errors.password && (
                <Text style={authStyles.error}>{errors.password}</Text>
              )}
            </View>
            <View style={{ position: "absolute", bottom: 120, right: 30 }}>
              <Pressable
                onPress={() => {
                  setPasswordShow(!passwordShow);
                }}
              >
                <Ionicons
                  name={passwordShow ? "eye" : "eye-off"}
                  size={24}
                  color="#00A1BF"
                />
              </Pressable>
            </View>

            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Repeat Password</Text>
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(value) => {
                  handleInputChange("confirmPassword", value);
                }}
                style={[
                  authStyle.input2,
                  errors.confirmPassword && { borderColor: "red" },
                ]}
                secureTextEntry={!showConfirmPassword}
                cursorColor={Colors.primary}
              />
            </View>
            <View style={{ position: "absolute", bottom: 10, right: 30 }}>
              <Pressable
                onPress={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#00A1BF"
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
              onPress={() => {
                setIsChecked(!isChecked);
              }}
            >
              <View
                style={[authStyles.checkbox, isChecked && authStyles.checked]}
              >
                {isChecked && <Text style={authStyles.checkmark}>✓</Text>}
              </View>
              <Text style={authStyles.label}>
                Agree with Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSignup}
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View
            style={{ backgroundColor: "#0000004D", width: 96, height: 2 }}
          ></View>
          <Text
            style={{
              marginVertical: 35,
              color: Colors.text,
              fontSize: 12,
              fontFamily: "PoppinsRegular",
              fontWeight: "600",
              letterSpacing: -0.24,
            }}
          >
            Or Sign Up with
          </Text>
          <View
            style={{ backgroundColor: "#0000004D", width: 96, height: 2 }}
          ></View>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: 32,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={authStyles.signupButtons}>
            <Image
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
              source={require("../../assets/images/apple.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={authStyles.signupButtons}>
            <Image
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
              source={require("../../assets/images/google.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.navigate("/login");
          }}
        >
          <Text style={authStyles.footer}>
            Already have an account?{" "}
            <Text
              style={{
                color: Colors.primary,
                fontFamily: "PoppinsSemiBold",
                textDecorationLine: "underline",
              }}
            >
              Login Here
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupPage;
