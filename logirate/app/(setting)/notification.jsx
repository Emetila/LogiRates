import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Notification = () => {
  const navigation = useNavigation();

  const [pushEnabled, setPushEnabled] = useState(false);
  const [priceDropChecked, setPriceDropChecked] = useState(false);
  const [promotionsChecked, setPromotionsChecked] = useState(false);
  const [updatesChecked, setUpdatesChecked] = useState(false);

  const handleSave = () => {
    console.log("Saved:", {
      pushEnabled,
      priceDropChecked,
      promotionsChecked,
      updatesChecked,
    });
  };

  const renderCheckbox = (checked, setChecked) => (
    <Pressable
      onPress={() => setChecked(!checked)}
      style={{
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#4FBBD0",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: checked ? "#4FBBD0" : "#fff",
      }}
    >
      {checked && (
        <MaterialCommunityIcons
          name="check"
          size={16}
          color="white"
        />
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* Back Button */}
      <Pressable onPress={() => navigation.goBack()} style={{ padding: 10 }}>
        <Image
          source={require("../../assets/images/Vector.png")}
          style={{ width: 20, height: 20, resizeMode: "contain" }}
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
            marginBottom: 40,
          }}
        >
          Notification
        </Text>
      </View>

      {/* Push Navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: Colors.text }}>
          Push Navigation
        </Text>
        <TouchableOpacity
          onPress={() => setPushEnabled(!pushEnabled)}
          style={{
            backgroundColor: pushEnabled ? "#4FBBD0" : "#ccc",
            width: 50,
            height: 28,
            borderRadius: 20,
            justifyContent: "center",
            paddingHorizontal: 4,
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              backgroundColor: "white",
              alignSelf: pushEnabled ? "flex-end" : "flex-start",
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Notifications Options */}
      <View
        style={{
          backgroundColor: "#F2F2F2",
          marginHorizontal: 20,
          borderRadius: 12,
          padding: 20,
        }}
      >
        {/* Price Drop */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: Colors.text }}>
            Price Drop Alert
          </Text>
          {renderCheckbox(priceDropChecked, setPriceDropChecked)}
        </View>

        {/* Promotions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: Colors.text }}>
            Promotions
          </Text>
          {renderCheckbox(promotionsChecked, setPromotionsChecked)}
        </View>

        {/* Company Updates */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: Colors.text }}>
            Logistics Company Updates
          </Text>
          {renderCheckbox(updatesChecked, setUpdatesChecked)}
        </View>
      </View>
      {/* Email Navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          margin: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: Colors.text }}>
          Email Notifications
        </Text>
        <TouchableOpacity
          onPress={() => setPushEnabled(!pushEnabled)}
          style={{
            backgroundColor: pushEnabled ? "#4FBBD0" : "#ccc",
            width: 50,
            height: 28,
            borderRadius: 20,
            justifyContent: "center",
            paddingHorizontal: 4,
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              backgroundColor: "white",
              alignSelf: pushEnabled ? "flex-end" : "flex-start",
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Email Options */}
      <View
        style={{
          backgroundColor: "#F2F2F2",
          marginHorizontal: 20,
          borderRadius: 12,
          padding: 20,
        }}
      >
        {/* Price Drop */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: Colors.text }}>
            Rate Trends
          </Text>
          {renderCheckbox(priceDropChecked, setPriceDropChecked)}
        </View>

        {/* Promotions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: Colors.text }}>
           Weekly Summary
          </Text>
          {renderCheckbox(promotionsChecked, setPromotionsChecked)}
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        style={{
          marginTop: 110,
          backgroundColor: "#4FBBD0",
          paddingVertical: 14,
          borderRadius: 10,
          marginHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Save 
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Notification;
