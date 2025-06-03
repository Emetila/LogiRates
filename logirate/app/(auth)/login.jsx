import Ionicons from "@expo/vector-icons/Ionicons";
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
import authStyles from "./styles";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
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
            onPress: () => router.navigate("/home"),
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
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: 91,
              alignSelf: "center",
              height: 99,
              aspectRatio: 91,
              marginTop: "10%",
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: Colors.primary,
              textAlign: "center",
              fontFamily: "PoppinsRegular",
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Welcome back!
          </Text>
        </View>
        <View style={authStyles.textBox}>
          <View style={authStyles.secContainer}>
            <View style={authStyles.formContainer}>
              <Text style={authStyles.formText}>Name</Text>
              <TextInput
                label="name"
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
            <View style={{ position: "absolute", bottom: 15, right: 20 }}>
              <Pressable onPress={() => setPasswordShow(!passwordShow)}>
                <Ionicons
                  name={passwordShow ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
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
            SignIn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.navigate("./signup");
          }}
        >
          <Text style={authStyles.footer}>
            Don't have an account?{" "}
            <Text
              style={{ color: Colors.primary, fontFamily: "PoppinsSemiBold" }}
            >
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
