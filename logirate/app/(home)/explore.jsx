import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
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

const Explore = ({ route, navigation }) => {
  const { from, to, date, passenger, vehicles } = route.params;

  // Get today's date for min date validation
  const today = new Date().toISOString().split("T")[0];

  return (
    <SafeAreaView>
      <ScrollView>
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
                <Text
                  style={{
                    color: Colors.text,
                    fontFamily: "PoppinsSemiBold",
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: -0.26,
                  }}
                >
                  Portharcourt - Lagos
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

        <FlatList 
        data={transportCompanies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.navigate('./details', { vehicle: item })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>Seats: {item.seats}</Text>
          </TouchableOpacity>
        )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
