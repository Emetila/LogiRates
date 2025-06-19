import { FontAwesome6 } from "@expo/vector-icons"; // ✅ Corrected importAdd commentMore actions
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { useState } from "react";
import PasStyles from "./styles";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState("");

  const handleContinue = () => {
    if (!value.trim()) {
      Alert.alert("Input Required", "Please enter your email or phone number.");
      return;
    }

    // Simulate sending OTP
    Alert.alert("Code Sent", `A verification code has been sent to ${value}`, [
      {
        text: "OK",
        onPress: () => navigation.navigate("otp1"),
      },
    ]);
  };

  return (
    <SafeAreaView style={PasStyles.container}>
      <Pressable onPress={() => navigation.goBack()} style={{ padding: 10 }}>
        <Image
          source={require("../../assets/images/Vector.png")}
          style={{
            width: 20,
            height: 20,
            resizeMode: "contain",
          }}
        />
      </Pressable>
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: Colors.text,
            fontFamily: "PoppinsMedium",
            fontSize: 32,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Forgot{"\n"}Password
        </Text>

        <Text style={{ marginBottom: 20, color: Colors.text }}>
          Enter your Phone number or Email to recover your password.
        </Text>

        <View style={{ position: "relative" }}>
          <FontAwesome6
           style={{ position: "absolute", zIndex:1, top:10, left:10}}
            name="user-large"
            size={24}
            color="#00A1BF"
          />
          <TextInput
            value={value}
            onChangeText={setValue}
            style={[
              PasStyles.input,
              { color: "black", backgroundColor: "#e0e0e0" },
            ]}
            placeholder="Email or Phone"
            placeholderTextColor="#555"
            cursorColor={Colors.primary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity onPress={handleContinue}>
          <Text
            style={{
              height: 50,
              padding: 15,
              color: Colors.white,
              textAlign: "center",
              fontFamily: "PoppinsSemiBold",
              fontSize: 16,
              fontWeight: "600",
              borderRadius: 10,
              backgroundColor: Colors.buttonBg,
              marginTop: 400,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;