import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Colors = {
  text: "#333",
  white: "#fff",
};

const Notification = () => {
  const navigation = useNavigation();

  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const [priceDropChecked, setPriceDropChecked] = useState(false);
  const [promotionsChecked, setPromotionsChecked] = useState(false);
  const [updatesChecked, setUpdatesChecked] = useState(false);

  const [rateTrendChecked, setrateTrendChecked] = useState(false);
  const [weeklySumChecked, setweeklySumChecked] = useState(false);

  const handleEnablePushNotifications = () => {
    setPriceDropChecked(true);
    setPromotionsChecked(true);
    setUpdatesChecked(true);
  };

  const handleDisablePushNotifications = () => {
    setPriceDropChecked(false);
    setPromotionsChecked(false);
    setUpdatesChecked(false);
  };

  const handleEnableEmailNotifications = () => {
    setrateTrendChecked(true);
    setweeklySumChecked(true);
  };

  const handleDisableEmailNotifications = () => {
    setrateTrendChecked(false);
    setweeklySumChecked(false);
  };

  const handleSave = () => {
    console.log("Saved settings:", {
      pushEnabled,
      emailEnabled,
      priceDropChecked,
      promotionsChecked,
      updatesChecked,
      rateTrendChecked,
      weeklySumChecked,
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
        <MaterialCommunityIcons name="check" size={16} color="white" />
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* Back Button */}
      <Pressable onPress={() => navigation.goBack()} style={{ padding: 10 }}>
        <Image
          source={require("../../assets/images/Vector.png")}
          style={{ width: 20, height: 90, resizeMode: "contain" }}
        />
      </Pressable>

      {/* Heading */}
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          style={{
            color: Colors.text,
            fontSize: 32,
            fontWeight: "600",
            marginBottom: 35,
          }}
        >
          Notification
        </Text>
      </View>

      {/* Push Notification Toggle */}
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
          Push Notifications
        </Text>

        <TouchableOpacity
          onPress={() => {
            const newValue = !pushEnabled;
            setPushEnabled(newValue);
            if (newValue) {
              handleEnablePushNotifications();
            } else {
              handleDisablePushNotifications();
            }
          }}
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

      {/* Push Notifications Options */}
      <View
        style={{
          backgroundColor: "#F2F2F2",
          marginHorizontal: 20,
          borderRadius: 12,
          padding: 20,
        }}
      >
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

      {/* Email Notification Toggle */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: Colors.text }}>
          Email Notifications
        </Text>
        <TouchableOpacity
          onPress={() => {
            const newValue = !emailEnabled;
            setEmailEnabled(newValue);
            if (newValue) {
              handleEnableEmailNotifications();
            } else {
              handleDisableEmailNotifications();
            }
          }}
          style={{
            backgroundColor: emailEnabled ? "#4FBBD0" : "#ccc",
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
              alignSelf: emailEnabled ? "flex-end" : "flex-start",
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Email Notifications Options */}
      <View
        style={{
          backgroundColor: "#F2F2F2",
          marginHorizontal: 20,
          borderRadius: 12,
          padding: 20,
        }}
      >
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
          {renderCheckbox(rateTrendChecked, setrateTrendChecked)}
        </View>

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
          {renderCheckbox(weeklySumChecked, setweeklySumChecked)}
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
