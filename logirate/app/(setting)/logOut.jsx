import Colors from "@/constants/Colors";
import React from "react";
import { Image, Pressable, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const LogOut = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* Back Button */}
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

      {/* Heading */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: Colors.text,
            fontFamily: "PoppinsMedium",
            fontSize: 32,
            fontWeight: "600",
            marginBottom:60
          }}
        >
          Log Out
        </Text>
      </View>

      {/* Content Section */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          gap: 10,
        }}
      >
        {/* Logout Image */}
        <Image
          source={require("../../assets/images/Logoutsymbol.png")}
          style={{
            width: 110,
            height: 90,
            resizeMode: "contain",
          }}
        />

        {/* Confirmation Text */}
        <Text
          style={{
            fontFamily: "PoppinsMedium",
            fontSize: 18,
            textAlign: "center",
            color: Colors.text,
          }}
        >
          Are you sure you want to leave?
        </Text>

        {/* No Button */}
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            borderColor: "#4FBBD0",
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 30,
            width: "80%",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "#4FBBD0",
              fontSize: 16,
              fontFamily: "PoppinsMedium",
            }}
          >
            No, It&apos;s a Mistake
          </Text>
        </TouchableOpacity>

        {/* Yes Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#4FBBD0",
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 30,
            width: "80%",
            alignItems: "center",
          }}
          onPress={() =>{
            router.push("/login");
          }}  
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "PoppinsMedium",
            }}
          >
            Yes, I&apos;m Sure
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LogOut;
