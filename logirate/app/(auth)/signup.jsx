import Ionicons from "@expo/vector-icons/Ionicons";
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
        }
      );

      const idToken = res.data.idToken;

      // Set display name
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          idToken,
          displayName: fullName,
          returnSecureToken: true,
        }
      );

      router.navigate("./login");
    } catch (error) {
      Alert.alert(
        "Signup Error",
        error.response?.data?.error?.message || "Something went wrong"
      );
    }

    const validate = () => {
      const newErrors = {};
      if (!isChecked) {
        Alert.alert(
          "Terms & Conditions",
          "You must agree to the terms to continue."
        );
        return;
      }
      if (!fullName.trim()) newErrors.fullName = "Name is required";
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
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Email Address</Text>
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
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </View>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={authStyles.input}
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
            <View style={{ position: "absolute", bottom: 130, right: 20 }}>
              <Pressable onPress={() => setPasswordShow(!passwordShow)}>
                <Ionicons
                  name={passwordShow ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>

            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Confirm Password</Text>
              <TextInput
                value={confirmpassword}
                onChangeText={setConfirmPassword}
                style={authStyles.input}
                secureTextEntry
                cursorColor={Colors.primary}
              />
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
                  style={{ color: Colors.primary, fontFamily: "PoppinsMedium" }}
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
        <Text
          style={{
            marginVertical: 35,
            color: Colors.text,
            fontSize: 20,
            fontFamily: "PoppinsRegular",
            fontWeight: "500",
            lineHeight: 20,
            textAlign: "center",
          }}
        >
          OR
        </Text>
        <View style={{ gap: 20 }}>
          <TouchableOpacity style={authStyles.signupButtons} >
            <Image
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
              source={require("../../assets/images/google.png")}
            />
            <Text>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={authStyles.signupButtons}>
            <Image
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
              source={require("../../assets/images/apple.png")}
            />
            <Text>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.navigate("./login");
          }}
        >
          <Text style={authStyles.footer}>
            Have an account?{" "}
            <Text
              style={{ color: Colors.primary, fontFamily: "PoppinsSemiBold" }}
            >
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signupPage;
