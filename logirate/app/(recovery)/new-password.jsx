import {
  Pressable,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { useState } from "react";

const CreatePassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const inputValue = route.params?.input || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);





  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Show modal
    setModalVisible(true);
  };

  const maskInput = (input) => {
    if (/\d/.test(input)) {
      return `${input.slice(0, 4)}******`;
    } else {
      const [user] = input.split("@");
      return `${user?.slice(0, 3)}***@***.com`;
    }
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
          Create{"\n"}Password
        </Text>

        <Text style={{ marginBottom: 20, color: Colors.text }}>
          Create new password for {maskInput(inputValue)}
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="New Password"
          placeholderTextColor="#555"
          secureTextEntry
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: 8,
            paddingHorizontal: 15,
            height: 50,
            marginBottom: 15,
            fontSize: 16,
            color: "black",
          }}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#555"
          secureTextEntry
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: 8,
            paddingHorizontal: 15,
            height: 50,
            fontSize: 16,
            color: "black",
          }}
        />

        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
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
              marginTop: 250,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Custom Success Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
              alignItems: "center",
              width: "80%",
            }}
          >
            <Image
              source={require("../../assets/images/success-filled.png")} // 🟢 your green checkmark icon here
              style={{ width: 60, height: 60, marginBottom: 15 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color:'black',
              }}
            >
              Password Created {"\n"} Successfully
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                color: Colors.text,
              }}
            >
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.text,
                }}
              >
                Let's Continue
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                router.push("/(tabs)/home");
              }}
              style={{
                backgroundColor: "#007bff",
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Back Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreatePassword;