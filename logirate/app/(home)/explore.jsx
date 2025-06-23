import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import authStyles from "./styles";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import home from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "../styles";
import React, { useEffect, useState } from "react";
import transportCompanies from "./vehicledata";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import api from "./api";
import apiClient from "./api";

export const fetchAllVendors = async () => {
  try {
    const response = await apiClient.get("/vendors/allvendors-with-routes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchVendors = async (params) => {
  try {
    const response = await apiClient.get("/vendors/filter", { params });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
const Explore = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const results = await searchVendors({
          from: params.from,
          to: params.to,
          minSeats: params.passengers,
          departureDate: params.departureDate,
        });
        setVendors(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [params]);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View
        style={{
          backgroundColor: "#4FBBD0",
          height: 197,
          paddingVertical: "10%",
          paddingHorizontal: "5%",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          position: "relative",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Text style={[authStyles.authText, { fontSize: 32 }]}>
            Explore Trips
          </Text>
          <Pressable
            onPress={() => {
              router.push("/home");
            }}
          >
            <AntDesign name="closecircleo" size={28} color="white" />
          </Pressable>
        </View>

        <Text
          style={[
            home.formText,
            { color: Colors.white, fontSize: 20, letterSpacing: -1 },
          ]}
        >
          {params.from} → {params.to}
        </Text>
      </View>
      <View style={[home.destinationField, { top: -30 }]}>
        <View style={{ position: "relative" }}>
          <MaterialIcons
            name="location-on"
            style={home.icon}
            size={24}
            color="#00A1BF"
          />
          <View
            style={{
              width: 308,
              alignSelf: "center",
              height: 66,
              backgroundColor: Colors.inputBg,
              paddingLeft: 50,
              paddingTop: 5,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: Colors.inputBg,
            }}
          >
            <Text style={styles.text}>
              {params.from} → {params.to} . {params.passengers}
            </Text>
            <Text
              style={{
                color: "#3B3C3DB2",
                fontSize: 12,
                fontWeight: "600",
                letterSpacing: -0.24,
              }}
            >
              13/05/2025
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        style={{ marginBottom: "30%" }}
        data={vendors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          // const route = item.routes?.[0];
          // if (!route) return null;
          return (
            <Pressable
              style={{ paddingHorizontal: 20, gap: 50 }}
              onPress={() => {
                router.navigate({
                  pathname: "./details",
                  params: { id: item._id },
                });
              }}
              
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
                  <Image
                    source={{ uri: item.logo }}
                    resizeMode="contain"
                    style={{ width: 90, height: 40 }}
                  />
                ) : (
                  <MaterialIcons name="directions-bus" size={40} color="#ccc" />
                )}

                <View style={{ gap: 5 }}>
                  <Text style={[home.itemText, { fontSize: 14 }]}>
                    {params.from} → {params.to}
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
                      gap: 6,
                    }}
                  >
                    <View style={{ flexDirection: "row", gap: 6 }}>
                      <MaterialCommunityIcons
                        name="clock-time-four"
                        size={24}
                        color="#00A1BF"
                      />
                      <Text style={home.itemText}>
                        {item.routes?.[0]?.departureTime}am
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 6 }}>
                      <FontAwesome5 name="user-alt" size={24} color="#00A1BF" />
                      <Text style={home.itemText}>
                        {item.routes?.[0]?.availableSeats}{" "}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 150,
                      height: 1,
                      backgroundColor: "#0000004D",
                    }}
                  />
                  <Text style={home.itemText}>
                    NGN {item.routes?.[0]?.price}
                  </Text>
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
            </Pressable>
          );
        }}
      />
      {/* )} */}
    </SafeAreaView>
  );
};

export default Explore;
