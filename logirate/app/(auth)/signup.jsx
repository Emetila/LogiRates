import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
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
import authStyles from "./styles";

WebBrowser.maybeCompleteAuthSession();

const API_KEY = "AIzaSyDD2QNOdSKMZXb4skZkziI3PEeC77ay76g";

const signupPage = () => {
  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     "http://500313097785-qdq6touioobd4i3rsddglusu8masbtfk.apps.googleusercontent.com",
  //   iosClientId:
  //     "http://500313097785-5tmjopme3p150in9jedgtp0ip1592ial.apps.googleusercontent.com",
  //   // androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
  //   webClientId:
  //     "500313097785-i9hkuag0gkb074a57tfhbcuou3ugc87e.apps.googleusercontent.com",
  // });

  const handleSignup = async () => {
    // if (!fullName || !email || !password || !confirmpassword) {
    //   Alert.alert("Error", "Please fill in all fields.");
    //   return;
    // }
    // if (password !== confirmpassword) {
    //   Alert.alert("Error", "Passwords do not match.");
    //   return;
    // }
    // if (!isChecked) {
    //   Alert.alert("Error", "Please accept the Terms & Conditions.");
    //   return;
    // }

    try {
      // Sign up the user
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        },
      );

      const idToken = res.data.idToken;

      // Set display name
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          idToken,
          displayName: fullName,
          returnSecureToken: true,
        },
      );

      router.navigate("./login");
    } catch (error) {
      Alert.alert(
        "Signup Error",
        error.response?.data?.error?.message || "Something went wrong",
      );
    }

    const validate = () => {
      const newErrors = {};
      if (!isChecked) {
        Alert.alert(
          "Terms & Conditions",
          "You must agree to the terms to continue.",
        );
        return;
      }
      if (!fullName.trim()) newErrors.fullName = "First name is required";
      if (!surname.trim()) newErrors.surname = "Surname is required";
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid";
      }
      if (!password.trim()) newErrors.password = "Password is required";

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    };

    const handleSignup = () => {
      if (validate()) {
        Alert.alert("Success!", "You have signed up successfully.", [
          {
            text: "Continue",
            onPress: () => router.navigate("./login"),
          },
        ]);
      }
    };

    // } catch (error) {
    //   Alert.alert("Signup Error", error.message);

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     Auth,
    //     email,
    //     password
    //   );
    //   const user = userCredential.user;

    //   // Update display name in Firebase
    //   await updateProfile(user, { displayName: fullName });

    //   // Save to AsyncStorage
    //   await AsyncStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       uid: user.uid,
    //       email: user.email,
    //       username: fullName,
    //     })
    //   );

    //   router.navigate("./login");
    // } catch (error) {
    //   Alert.alert("Signup Error", error.message);
    // }
  };

  // const handleGoogleSignup = async () => {
  //     const result = await promptAsync();
  //     if (result?.type === "success") {
  //       const googleIdToken = result.authentication.idToken;
  //       try {
  //         const res = await axios.post(
  //           `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${API_KEY}`,
  //           {
  //             postBody: `id_token=${googleIdToken}&providerId=google.com`,
  //             requestUri: "http://localhost",
  //             returnSecureToken: true,
  //           }
  //         );
  //         router.navigate('./login')
  //       } catch (error) {
  //         Alert.alert(
  //           "Google Signup Error",
  //           error.response?.data?.error?.message || "Something went wrong"
  //         );
  //       }
  //     }
  //   };

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView>
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
            Hello there!
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
                  style={authStyles.icon}
                  name="user-large"
                  size={24}
                  color="#00A1BF"
                />
                <TextInput
                  label="full name"
                  mode="outlined"
                  error={!!errors.fullName}
                  value={fullName}
                  onChangeText={setFullName}
                  style={authStyles.input}
                  cursorColor={Colors.primary}
                />
                {errors.name && (
                  <Text style={authStyles.error}>{errors.fullName}</Text>
                )}
              </View>
            </View>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Surname</Text>
              <View style={{ position: "relative" }}>
                <FontAwesome6
                  style={authStyles.icon}
                  name="user-large"
                  size={24}
                  color="#00A1BF"
                />
                <TextInput
                  label="full name"
                  mode="outlined"
                  error={!!errors.surname}
                  value={surname}
                  onChangeText={setSurname}
                  style={authStyles.input}
                  cursorColor={Colors.primary}
                />
                {errors.name && (
                  <Text style={authStyles.error}>{errors.surname}</Text>
                )}
              </View>
            </View>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Email/Mobile</Text>
              <View style={{ position: "relative" }}>
                <MaterialCommunityIcons
                  style={authStyles.icon}
                  name="email"
                  size={24}
                  color="#00A1BF"
                />
                <TextInput
                  mode="outlined"
                  label="email"
                  value={email}
                  onChangeText={setEmail}
                  style={authStyles.input}
                  cursorColor={Colors.primary}
                  keyboardType="email-address"
                  error={!!errors.email}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>
            </View>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={authStyles.input2}
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
            <View style={{ position: "absolute", bottom: 120, right: 20 }}>
              <Pressable onPress={() => setPasswordShow(!passwordShow)}>
                <Ionicons
                  name={passwordShow ? "eye" : "eye-off"}
                  size={24}
                  color="#0F141A66"
                />
              </Pressable>
            </View>

            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Repeat Password</Text>
              <TextInput
                value={confirmpassword}
                onChangeText={setConfirmPassword}
                style={authStyles.input2}
                secureTextEntry
                cursorColor={Colors.primary}
              />
            </View>
            <View style={{ position: "absolute", bottom: 10, right: 20 }}>
              <Pressable onPress={() => setPasswordShow(!passwordShow)}>
                <Ionicons
                  name={passwordShow ? "eye" : "eye-off"}
                  size={24}
                  color="#0F141A66"
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
              onPress={() => setIsChecked(!isChecked)}
            >
              <View
                style={[authStyles.checkbox, isChecked && authStyles.checked]}
              >
                {isChecked && <Text style={authStyles.checkmark}>✓</Text>}
              </View>
              <Text style={authStyles.label}>
                Agree with{" "}
                <Text
                  style={{
                    color: Colors.primary,
                    fontFamily: "PoppinsMedium",
                    textDecorationLine: "underline",
                  }}
                >
                  Terms & Conditions{" "}
                </Text>
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
            router.navigate("./login");
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

export default signupPage;
