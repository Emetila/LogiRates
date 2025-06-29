import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Colors from "@/constants/Colors";
import authStyle from "../(auth)/style";
import home from "./styles";

export default function VendorDetailScreen() {
  const { id } = useLocalSearchParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        console.log("Fetching vendor with ID:", id);
        const response = await fetch(
          "https://logirate-api.onrender.com/vendors/allvendors-with-routes"
        );
        const data = await response.json();

        // Debug: Check the ID field names
        if (data.length > 0) {
          console.log("First vendor keys:", Object.keys(data[0]));
        }

        // Find vendor by either id or _id
        const foundVendor = data.find((v) => v.id === id || v._id === id);
        
        if (!foundVendor) {
          console.error("Available IDs:", data.map(v => v.id || v._id));
          throw new Error(`Vendor with ID ${id} not found`);
        }

        setVendor(foundVendor);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  const renderRouteItem = ({ item, index }) => (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        {item.from} → {item.to}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.primary }}>Departure:</Text>
          <Text>{item.departureTime || "N/A"}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.primary }}>Price:</Text>
          <Text>₦{item.price?.toLocaleString() || "N/A"}</Text>
        </View>
      </View>
    </View>
  );

  const ListHeaderComponent = () => (
    <>
      <View
        style={{
          alignItems: "center",
          marginBottom: 24,
          backgroundColor: Colors.white,
          borderRadius: 15,
          paddingVertical: 20,
        }}
      >
        {vendor.logo ? (
          <Image
            source={{ uri: vendor.logo }}
            style={{
              width: 200,
              height: 100,
              resizeMode: "contain",
            }}
            onError={(e) => console.log("Image error:", e.nativeEvent.error)}
          />
        ) : (
          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text>No Logo Available</Text>
          </View>
        )}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          {vendor.name}
        </Text>
        <Text style={{ color: Colors.primary, marginTop: 4 }}>
          {vendor.vehicleType}
        </Text>
        {/* <Text style={{ flex: 1 }}>{vendor.price || "N/A"}</Text> */}
        <Text style={{ marginLeft: 8 }}>{vendor.description || "N/A"}</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
          Contact Information
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <FontAwesome5 name="envelope" size={16} color={Colors.primary} />
          <Text style={{ marginLeft: 8 }}>{vendor.contactInfo || "N/A"}</Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 12,
          marginTop: 8,
        }}
      >
        Available Routes ({vendor.routes?.length || 0})
      </Text>
    </>
  );

  const ListFooterComponent = () => (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
        Vehicle Details
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <Text style={{ flex: 1, color: Colors.text }}>Type:</Text>
        <Text style={{ flex: 1 }}>{vendor.vehicle || "N/A"}</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <Text style={{ flex: 1, color: Colors.text }}>Capacity:</Text>
        <Text style={{ flex: 1 }}>{vendor.availableSeats || "N/A"}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1, color: Colors.text }}>Services:</Text>
        <Text style={{ flex: 1 }}>
          {vendor.services?.join(", ") || "None"}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 16 }}>Error: {error}</Text>
        <Pressable
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: Colors.primary,
            borderRadius: 8,
          }}
          onPress={() => {
            setLoading(true);
            setError(null);
            setVendor(null);
          }}
        >
          <Text style={{ color: "white" }}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 20,
          paddingHorizontal: 16,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={24} color="white" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            // marginTop: 12,
          }}
        >
          {vendor.companyName}
        </Text>
        <Text style={[authStyle.authText, { fontSize: 32 }]}>
          Operator Details
        </Text>
        <Text style={[home.formText, { color: Colors.white }]}>
          Let&apos;s know more...
        </Text>
      </View>

      <FlatList
        data={vendor.routes || []}
        renderItem={renderRouteItem}
        keyExtractor={(item, index) => `${item._id || index}`}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 24,
              alignItems: "center",
              elevation: 2,
            }}
          >
            <FontAwesome5
              name="route"
              size={40}
              color={Colors.textSecondary}
              style={{ opacity: 0.5 }}
            />
            <Text
              style={{
                marginTop: 12,
                color: Colors.textSecondary,
                textAlign: "center",
              }}
            >
              No routes available for this operator
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
