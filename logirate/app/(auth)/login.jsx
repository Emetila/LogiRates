import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { createContext, useContext, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

// WebBrowser.maybeCompleteAuthSession();

// const API_KEY = "AIzaSyDD2QNOdSKMZXb4skZkziI3PEeC77ay76g";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://logirate-api.onrender.com/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 1000,
        }
      );

      console.log("✅ Login successful:", response.status);
      console.log(
        "📄 Full response data:",
        JSON.stringify(response.data, null, 2)
      );

      const { user: userData, token: authToken } = response.data;

      if (!userData || !authToken) {
        console.error(
          "❌ Missing user data or token in response:",
          response.data
        );
        throw new Error("Invalid response structure");
      }

      // Store user data and token
      await AsyncStorage.setItem("userToken", authToken);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
      setToken(authToken);

      return { success: true };
    } catch (error) {
      console.error("🔥 Login error:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });
      let errorMessage = "Login failed. Please try again.";

      if (error.code === "ECONNABORTED") {
        errorMessage =
          "Request timeout. The server might be starting up (Render.com can take 30+ seconds).";
      } else if (
        error.message.includes("Network Error") ||
        error.code === "NETWORK_ERROR"
      ) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (error.response?.status === 404) {
        errorMessage = "Login endpoint not found. Please contact support.";
      } else if (error.response?.status === 422) {
        errorMessage = "Invalid input format. Please check your email.";
      } else if (error.response?.status === 404) {
        errorMessage = "User not found";
      }

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        Alert.alert("Success", "Login successful!");
        [
          {
            text: "OK",
            onPress: () => router.push("/home"),
          },
        ];
      } else {
        Alert.alert("Login Failed", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text
            style={{
              color: Colors.text,
              fontFamily: "PoppinsMedium",
              fontSize: 32,
              fontWeight: "600",
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
                  <Text style={authStyles.error}>{errors.email}</Text>
                )}
              </View>
            </View>

            {/* Password */}
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
                autoCapitalize="none"
              />
              {errors.password && (
                <Text style={authStyles.error}>{errors.password}</Text>
              )}
            </View>

            {/* Toggle password visibility */}
            <View style={{ position: "absolute", bottom: 30, right: 30 }}>
              <Pressable onPress={() => {
                  setPasswordShow(!passwordShow);
              }}>
                <Ionicons
                  name={passwordShow ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>

            {/* Forgot password */}
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

        {/* Login button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
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

        {/* Social login buttons */}
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

        {/* Footer */}
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
