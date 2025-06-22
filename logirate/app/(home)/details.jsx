import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import { router, useLocalSearchParams } from "expo-router";
import transportCompanies from "./vehicledata";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Colors from "@/constants/Colors";
import authStyle from "../(auth)/style";
import home from "./styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function VehicleDetailScreen() {
  const params = useLocalSearchParams();
  const { companyId, from, to, departureDate, passengers } = params;
  const selectedCompany = transportCompanies.find(
    (company) => company.id === parseInt(companyId)
  );

  if (!selectedCompany) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Company not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <View style={styles.errorContainer}>
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
            <Pressable
              onPress={() => {
                router.navigate("./explore");
              }}
            >
              <FontAwesome5 name="arrow-left" size={24} color="white" />
            </Pressable>
            <Text style={[authStyle.authText, { fontSize: 32 }]}>
              Operator Details
            </Text>

            <Text style={[home.formText, { color: Colors.white }]}>
              Let&apos;s know more...
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors.white,
            marginHorizontal: 20,
            paddingVertical: 20,
            marginVertical: 20,
            borderRadius: 15,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Image
              source={selectedCompany.image}
              resizeMode="contain"
              style={{ width: 220, height: 56, alignSelf: "center" }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 20,
                alignItems: "center",
              }}
            >
              <View>
                <Text style={home.locationText}>{selectedCompany.from1}</Text>
                <Text
                  style={[
                    home.locationText,
                    {
                      fontFamily: "PoppinsRegular",
                      fontSize: 16,
                      letterSpacing: -0.32,
                    },
                  ]}
                >
                  {selectedCompany.location1}
                </Text>
              </View>
              <FontAwesome6 name="arrow-right" size={24} color="#00A1BF" />
              <View>
                <Text style={home.locationText}>{selectedCompany.from2}</Text>
                <Text
                  style={[
                    home.locationText,
                    {
                      fontFamily: "PoppinsRegular",
                      fontSize: 16,
                      letterSpacing: -0.32,
                    },
                  ]}
                >
                  {selectedCompany.location2}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "centers",
                  gap: 8,
                  paddingHorizontal: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="clock-time-four"
                  size={24}
                  color="#00A1BF"
                />
                <Text style={[home.locationText, { fontSize: 18 }]}>
                  {selectedCompany.time}
                </Text>
                {/* <Text>{selectedCompany.date}</Text> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "centers",
                  gap: 8,
                  paddingHorizontal: 5,
                }}
              >
                <FontAwesome5 name="user-alt" size={24} color="#00A1BF" />
                <Text style={[home.locationText, { fontSize: 18 }]}>
                  {selectedCompany.maxPassengers}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: Colors.text,
                fontFamily: "PoppinsBold",
                textAlign: "center",
                fontSize: 32,
                letterSpacing: -0.64,
                paddingTop: 20,
              }}
            >
              {selectedCompany.price}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 5,
                paddingTop: 20,
              }}
            >
              <View style={home.detailsIcon}>
                <FontAwesome5 name="bus" size={24} color="#00A1BF" />
                <Text style={home.detailsText}>{selectedCompany.vehicle}</Text>
              </View>
              <View style={home.detailsIcon}>
                <FontAwesome name="phone" size={24} color="#00A1BF" />
                <Text style={home.detailsText}>{selectedCompany.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={[
            home.detailTitle,
            { paddingHorizontal: "5%", paddingTop: 10 },
          ]}
        >
          Portharcourt Terminals
        </Text>
        <View style={home.details}>
          <View style={{ gap: 10 }}>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.terminal1.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.terminal1.address}
              </Text>
              <View
                style={[home.detailsIcon, { width: 120, paddingVertical: 3 }]}
              >
                <FontAwesome name="phone" size={16} color="#00A1BF" />
                <Text style={[home.detailsText, { fontSize: 12 }]}>
                  {selectedCompany.terminal1.phone}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "90%",
                backgroundColor: Colors.text2,
                height: 1,
                paddingHorizontal: 10,
                alignSelf: "center",
                marginVertical: 15,
              }}
            ></View>
          </View>
          <View>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.terminal2.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.terminal2.address}
              </Text>
              <View
                style={[home.detailsIcon, { width: 120, paddingVertical: 3 }]}
              >
                <FontAwesome name="phone" size={16} color="#00A1BF" />
                <Text style={[home.detailsText, { fontSize: 12 }]}>
                  {selectedCompany.terminal2.phone}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "90%",
                backgroundColor: Colors.text2,
                height: 1,
                paddingHorizontal: 10,
                alignSelf: "center",
                marginVertical: 15,
              }}
            ></View>
          </View>
          <View>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.terminal3.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.terminal3.address}
              </Text>
              <View
                style={[home.detailsIcon, { width: 120, paddingVertical: 3 }]}
              >
                <FontAwesome name="phone" size={16} color="#00A1BF" />
                <Text style={[home.detailsText, { fontSize: 12 }]}>
                  {selectedCompany.terminal3.phone}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={[
            home.detailTitle,
            { paddingHorizontal: "5%", paddingTop: 10 },
          ]}
        >
          Lagos Terminals
        </Text>
        <View style={home.details}>
          <View style={{ gap: 10 }}>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.directionTerminal1.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.directionTerminal1.address}
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.text2,
                  height: 1,
                  paddingHorizontal: 5,
                  alignSelf: "center",
                  marginVertical: 5,
                }}
              ></View>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.directionTerminal2.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.directionTerminal2.address}
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.text2,
                  height: 1,
                  paddingHorizontal: 5,
                  alignSelf: "center",
                  marginVertical: 5,
                }}
              ></View>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.directionTerminal3.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.directionTerminal3.address}
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.text2,
                  height: 1,
                  paddingHorizontal: 5,
                  alignSelf: "center",
                  marginVertical: 5,
                }}
              ></View>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.directionTerminal4.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.directionTerminal4.address}
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.text2,
                  height: 1,
                  paddingHorizontal: 5,
                  alignSelf: "center",
                  marginVertical: 5,
                }}
              ></View>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.directionTerminal5.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.directionTerminal5.address}
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.text2,
                  height: 1,
                  paddingHorizontal: 5,
                  alignSelf: "center",
                  marginVertical: 5,
                }}
              ></View>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.directionTerminal6.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.directionTerminal6.address}
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.text2,
                  height: 1,
                  paddingHorizontal: 5,
                  alignSelf: "center",
                  marginVertical: 5,
                }}
              ></View>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 15, gap: 8 }}>
              <Text
                style={[home.terminalText, { fontFamily: "PoppinsSemiBold" }]}
              >
                {selectedCompany.directionTerminal7.name}
              </Text>
              <Text style={home.terminalText2}>
                {selectedCompany.directionTerminal7.address}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
