import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
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

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    try {
      const res = await axios.post(url, {
        fullName,
        email,
        password,
        returnSecureToken: true,
      });
      Alert.alert("Success", `Welcome ${res.data.fullName}`);
      router.push("/home");
    } catch (error) {
      Alert.alert(
        "Login Error",
        error.response?.data?.error?.message || "Something went wrong"
      );
    }

    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const validate = () => {
      const newErrors = {};
      if (!fullName.trim()) newErrors.fullName = "Name is required";
      if (!password.trim()) newErrors.password = "Password is required";

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    };

    const handleLogin = () => {
      if (validate()) {
        Alert.alert("Success!", "You have signed up successfully.", [
          {
            text: "Continue",
            onPress: () => router.push("/home"),
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
  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView>
        <Image
          source={require("../../assets/images/loginimg.png")}
          style={{
            width: 222,
            alignSelf: "center",
            height: 222,
            marginTop: "10%",
            resizeMode: "contain",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: Colors.text,
              fontFamily: "PoppinsMedium",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: -1.6,
            }}
          >
            Welcome back!
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
            Let&apos;s get you ready for another trip!
          </Text>
        </View>
        <View style={authStyles.textBox}>
          <View style={authStyles.secContainer}>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Name</Text>
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
            <View style={{ position: "absolute", bottom: 30, right: 20 }}>
              <Pressable onPress={() => setPasswordShow(!passwordShow)}>
                <Ionicons
                  name={passwordShow ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            <TouchableOpacity
              style={{ marginTop: -20 }}
              onPress={() => {
                router.push("/forgot-password");
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: Colors.text,
                  fontFamily: "PoppinsMedium",
                  fontSize: 12,
                  fontWeight: "600",
                  letterSpacing: -0.24,
                  paddingRight: 20,
                }}
              >
                Forgotten Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Login
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
        ></TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.navigate("./signup");
          }}
        >
          <Text style={authStyles.footer}>
            Want to open an account?{" "}
            <Text
              style={{
                color: Colors.primary,
                fontFamily: "PoppinsSemiBold",
                textDecorationLine: "underline",
              }}
            >
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
