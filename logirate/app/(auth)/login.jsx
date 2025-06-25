import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
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
import authStyles from "../(home)/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authStyle from "./style";

const Login = () => {
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      console.log("Stored users:", parsedUsers);

      const matchedUser = parsedUsers.find(
        (user) =>
          user.email.toLowerCase().trim() === email.toLowerCase().trim() &&
          user.password === password
      );

      if (matchedUser) {
        Alert.alert(
          "Login Successful",
          `${matchedUser.email} logged in successfully`,
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/home");
              },
            },
          ]
        );
      } else {
        Alert.alert("Login Failed", "Invalid email or password.");
      }
    } catch (err) {
      Alert.alert("Login Error", "Something went wrong.");
    }
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text
            style={{
              color: Colors.text,
              fontFamily: "PoppinsMedium",
              fontSize: 32,
            }}
          >
            Welcome back!
          </Text>
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              fontSize: 14,
              color: Colors.text,
            }}
          >
            Let&apos;s get you ready for another trip!
          </Text>
        </View>

        <View style={authStyles.textBox}>
          <View style={authStyles.secContainer}>
            <View style={authStyles.formContainer}>
              <Text style={authStyle.formText}>Email/Mobile</Text>
              <View style={{ position: "relative" }}>
                <MaterialCommunityIcons
                  style={authStyle.icon2}
                  name="email"
                  size={24}
                  color="#00A1BF"
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={authStyles.input2}
                  cursorColor={Colors.primary}
                  keyboardType="email-address"
                />
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
                autoCapitalize="none"
              />
            </View>

            <View style={{ position: "absolute", bottom: 35, right: 30 }}>
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
          />
          <Text
            style={{
              marginVertical: 35,
              color: Colors.text,
              fontSize: 12,
              fontFamily: "PoppinsRegular",
              fontWeight: "600",
            }}
          >
            Or Sign Up with
          </Text>
          <View
            style={{ backgroundColor: "#0000004D", width: 96, height: 2 }}
          />
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
            router.navigate("/signup");
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