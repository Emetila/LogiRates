import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import authStyles from "./styles";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import home from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "../styles";
import React, { useState } from "react";
import transportCompanies from "./vehicledata";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Explore = ({ route, navigation }) => {
  const params = useLocalSearchParams();
  const { from, to, departureDate, passengers } = params;
  const handleCompanyClick = (company) => {
    router.push({
      pathname: "/details",
      params: {
        companyId: company.id.toString(),
        from,
        to,
        departureDate,
        passengers,
      },
    });
  };

  return (
    <SafeAreaView>
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
          Portharcourt - Lagos
        </Text>
      </View>
      <View style={[home.destinationField, { top: -30 }]}>
        <View>
          <View style={{ position: "relative" }}>
            <MaterialIcons
              name="location-on"
              style={home.icon}
              size={24}
              color="#00A1BF"
            />
            {/* <TextInput
                label="to"
                mode="outlined"
                style={styles.input}
                cursorColor={Colors.primary}
              /> */}
            <View
              style={{
                width: 308,
                borderStyle: "solid",
                alignSelf: "center",
                height: 66,
                backgroundColor: Colors.inputBg,
                paddingLeft: 50,
                paddingTop: 5,
                fontFamily: "PoppinsSemiBold",
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Colors.inputBg,
              }}
            >
              <Text style={styles.text}>
                {from} → {to} • {passengers}
              </Text>

              <Text
                style={{
                  color: "#3B3C3DB2",
                  fontFamily: "PoppinsSemiBold",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: -0.24,
                }}
              >
                13/05/2025
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* {!vehicles || vehicles.length === 0 ? (
          <Text>No vehicles found for this route.</Text>
        ) : ( */}
      <FlatList
        style={{ marginBottom: "90%" }}
        data={transportCompanies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ paddingHorizontal: 20, gap: 50 }}
            onPress={() => router.navigate("./details", { vehicle: item })}
          >
            <View
              style={{
                backgroundColor: Colors.white,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                borderRadius: 15,
                borderStyle: "solid",
                marginBottom: 10,
                paddingVertical: 10,
                gap: 40,
                alignItems: "center",
              }}
            >
              <Image
                source={item.image}
                resizeMode="contain"
                style={{ width: 90, height: 40 }}
              />
              <View style={{ gap: 5 }}>
                <Text style={[home.itemText, { fontSize: 14 }]}>
                  {item.destination}
                </Text>
                <View
                  style={{
                    width: 150,
                    height: 1,
                    backgroundColor: "#0000004D",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 6,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="clock-time-four"
                      size={24}
                      color="#00A1BF"
                    />
                    <Text style={home.itemText}>{item.time}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 6,
                    }}
                  >
                    <FontAwesome5 name="user-alt" size={24} color="#00A1BF" />
                    <Text style={home.itemText}>{item.maxPassengers}</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: 150,
                    height: 1,
                    backgroundColor: "#0000004D",
                  }}
                ></View>
                <Text style={home.itemText}>{item.price}</Text>
                <Text
                  style={{
                    color: Colors.primary,
                    width: 91,
                    fontFamily: "PoppinsMedium",
                    fontSize: 14,
                    alignSelf:'flex-end',
                    // alignItems:'flex-end'
                  }}
                >
                  More Details
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* )} */}
    </SafeAreaView>
  );
};

export default Explore;
