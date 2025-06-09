import {
  Pressable,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { useRef, useState } from "react";

const OtpVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const inputValue = route.params?.input || ""; // email or phone from previous screen

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const maskInput = (input) => {
    if (/\d/.test(input)) {
      // It's a phone number
      return `${input.slice(0, 4)}******`;
    } else {
      // It's an email
      if (!input.includes("@")) return "*****@***.com";
    }
  };

  const handleSend = () => {
    if (otp.includes("")) {
      alert("Please enter the complete OTP.");
      return;
    }
    navigation.navigate("new-password");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
          OTP Code{"\n"}Verification
        </Text>

        <Text style={{ marginBottom: 20, color: Colors.text }}>
          Enter the code sent to {maskInput(inputValue)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputs.current[i] = ref)}
              value={otp[i]}
              onChangeText={(text) => handleChange(text, i)}
              style={{
                width: 45,
                height: 50,
                borderWidth: 1,
                borderColor: Colors.primary,
                borderRadius: 8,
                textAlign: "center",
                fontSize: 18,
                backgroundColor: "#e0e0e0",
                color: "black",
              }}
              maxLength={1}
              keyboardType="numeric"
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleSend} activeOpacity={0.8}>
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
              marginTop: 300,
            }}
          >
            Recover Password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;
