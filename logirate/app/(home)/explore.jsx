// ExploreScreen.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import authStyles from "./styles";
import home from "./styles";
import Colors from "@/constants/Colors";

// Travu search
const fetchTravu = async (from, to, pax) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 4000); // Timeout
  const res = await fetch("https://api.travu.africa/test/api/v1/bus/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
    body: JSON.stringify({ from, to, pax: Number(pax) }),
  });
  const json = await res.json();
  return json.trips.map((t) => ({
    _id: `travu-${t.id}`,
    operator: t.operatorName,
    logo: t.operatorLogoUrl,
    from,
    to,
    departureTime: t.departureTime,
    seatsAvailable: t.seatsAvailable,
    price: t.price,
    seatMap: t.seatMap,
  }));
};

// Mock transport/logistics
const mockData = [
  {
    id: "lg1",
    type: "logistics",
    name: "DHL Express",
    logo: require("../../assets/images/DHL Express.jpeg"),
    departureTime: "09:00",
    seats: 0,
    price: 50000,
  },
  {
    id: "lg2",
    type: "logistics",
    name: "FedEx Nigeria",
    logo: require("../../assets/images/download.jpeg"),
    departureTime: "10:00",
    seats: 0,
    price: 55000,
  },
  {
    id: "tr1",
    type: "transport",
    name: "GIGM",
    logo: require("../../assets/images/GIG Logo 2.png"),
    departureTime: "14:00",
    seats: 25,
    price: 16000,
  },
  {
    id: "tr2",
    type: "transport",
    name: "ABC Transport",
    logo: require("../../assets/images/ABC Logo 1.png"),
    departureTime: "16:30",
    seats: 15,
    price: 18000,
  },
];

export default function ExploreScreen() {
  const { from, to, passenger } = useLocalSearchParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const travaRes = await fetchTravu(from, to, passenger);
        setVendors(
          travaRes.length
            ? travaRes
            : mockData.map((m) => ({
                _id: `${m.type}-${m.id}`,
                operator: m.name,
                logo: m.logo,
                from,
                to,
                departureTime: m.departureTime,
                seatsAvailable: m.seats,
                price: m.price,
                seatMap: null,
              }))
        );
      } catch {
        console.log("Primary API failed, using mock data");
        setVendors(
          mockData.map((m) => ({
            _id: `${m.type}-${m.id}`,
            operator: m.name,
            logo: m.logo,
            from,
            to,
            departureTime: m.departureTime,
            seatsAvailable: m.seats,
            price: m.price,
            seatMap: null,
          }))
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#4FBBD0",
          height: 197,
          paddingVertical: "10%",
          paddingHorizontal: "5%",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[authStyles.authText, { fontSize: 32 }]}>
            Explore Trips
          </Text>
          <Pressable onPress={() => router.push("/home")}>
            <AntDesign name="closecircleo" size={28} color="white" />
          </Pressable>
        </View>
        <Text
          style={[
            home.formText,
            { color: Colors.white, fontSize: 20, letterSpacing: -1 },
          ]}
        >
          {from} - {to}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={vendors}
          keyExtractor={(item) => item._id}
          style={{ marginBottom: "30%" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: { tripId: item._id },
                })
              }
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  marginBottom: 10,
                  paddingVertical: 10,
                  alignItems: "center",
                  gap: 40,
                }}
              >
                {item.logo ? (
                  typeof item.logo === "number" ? (
                    <Image
                      source={item.logo}
                      style={{ width: 90, height: 40 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={{ uri: item.logo }}
                      style={{ width: 90, height: 40 }}
                      resizeMode="contain"
                    />
                  )
                ) : (
                  <MaterialIcons name="directions-bus" size={40} color="#ccc" />
                )}
                <View style={{ gap: 5 }}>
                  <Text style={[home.itemText, { fontSize: 14 }]}>
                    {item.from} → {item.to}
                  </Text>
                  <View
                    style={{
                      width: 150,
                      height: 1,
                      backgroundColor: "#0000004D",
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row", gap: 6 }}>
                      <MaterialCommunityIcons
                        name="clock-time-four"
                        size={24}
                        color="#00A1BF"
                      />
                      <Text style={home.itemText}>{item.departureTime}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 6 }}>
                      <FontAwesome5 name="user-alt" size={24} color="#00A1BF" />
                      <Text style={home.itemText}>{item.seatsAvailable}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 150,
                      height: 1,
                      backgroundColor: "#0000004D",
                    }}
                  />
                  <Text style={home.itemText}>₦{item.price}</Text>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: 14,
                      alignSelf: "flex-end",
                    }}
                  >
                    More Details
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
