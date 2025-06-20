import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import authStyles from "../(home)/styles";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "@/components/ui/Button";
import transportCompanies from "../(home)/vehicledata";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import {format} from "date-fns"

const { width, height } = Dimensions.get("window");
const Home = () => {
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  // const [passenger, setPassenger] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState("explore");
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departureDate: "",
    passengers: "",
  });
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const router = useRouter();
  // const [currentPage, setCurrentPage] = useState("search");
  // const [isExploring, setIsExploring] = useState(false);
  // const [vehicles, setVehicles] = useState([]);
  // const [searchData, setSearchData] = useState({});

  // Get today's date for min date validation
  const today = new Date().toISOString().split("T")[0];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formatted = date.toISOString().split("T")[0]; // "yyyy-MM-dd"
    setDeparture(formatted);
    hideDatePicker();
  };

  const handleSearch = () => {
    if (searchData.from && searchData.to) {
      router.push({
        pathname: "/explore",
        params: {
          from: searchData.from,
          to: searchData.to,
          passengers: searchData.passengers,
        },
      });
    } else {
      Alert.alert("Missing Information", "Please fill in all required fields");
    }
  };

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuickRoute = (from, to) => {
    setSearchData((prev) => ({
      ...prev,
      from,
      to,
    }));
  };

  // const handleExplore = () => {
  //   if (from && to && departure && passenger) {
  //     const filteredVehicles = transportCompanies.filter(
  //       (v) =>
  //         v.route?.from?.toLowerCase() === from.toLowerCase() &&
  //         v.route?.to?.toLowerCase() === to.toLowerCase()
  //     );

  //     router.push("/explore", {
  //       from,
  //       to,
  //       departure,
  //       passenger,
  //       vehicles: filteredVehicles,
  //     });
  //   } else {
  //     alert("Please fill all fields.");
  //   }
  // };

  return (
    <SafeAreaView style={styles.container2}>
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
              Hello User
            </Text>
            <Pressable
              onPress={() => {
                router.push("/notification");
              }}
            >
              <MaterialCommunityIcons
                name="bell-circle"
                size={28}
                color="white"
              />
            </Pressable>
          </View>
          <Text
            style={[authStyles.formText, { color: Colors.white, fontSize: 14 }]}
          >
            Where will you be going today?
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: "8%",
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: Colors.white,
            position: "relative",
            top: "-6%",
            zIndex: 2,
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
            left: 0,
          }}
        >
          <View style={{ position: "relative" }}>
            {/* <Text style={styles.inputfield}>From</Text> */}
            <View style={{ position: "relative" }}>
              <MaterialIcons
                name="location-on"
                style={styles.icon}
                size={24}
                color="#00A1BF"
              />
              <TextInput
                label="from"
                mode="outlined"
                value={searchData.from}
                // onChange={(e) => setFrom(e.target.value)}
                onChangeText={(text) => handleInputChange("from", text)}
                style={styles.input}
                placeholder="From"
                placeholderTextColor={Colors.text2}
                cursorColor={Colors.primary}
              />
            </View>
          </View>

          <View style={{ position: "relative" }}>
            {/* <Text style={styles.inputfield}>To</Text> */}
            <View style={{ position: "relative" }}>
              <MaterialIcons
                name="location-on"
                style={styles.icon}
                size={24}
                color="#00A1BF"
              />
              <TextInput
                label="to"
                mode="outlined"
                value={searchData.to}
                // onChange={(e) => setTo(e.target.value)}
                onChangeText={(text) => handleInputChange("to", text)}
                style={styles.input}
                cursorColor={Colors.primary}
                placeholder="To"
                placeholderTextColor={Colors.text2}
              />
            </View>
          </View>

          <View style={{ position: "relative" }}>
            {/* <Text style={styles.inputfield}>Departure</Text> */}
            <View style={{ position: "relative" }}>
              <Ionicons
                name="calendar-clear"
                size={24}
                color="#00A1BF"
                style={styles.icon}
              />
              <Pressable onPress={showDatePicker}>
                <View pointerEvents="none">
                  <TextInput
                    mode="outlined"
                    value={departure}
                    editable={false}
                    // onChangeText={setDeparture}
                    style={styles.input}
                    cursorColor={Colors.primary}
                    placeholder="Departure"
                    placeholderTextColor={Colors.text2}
                  />
                </View>
              </Pressable>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date()}
              />
            </View>
          </View>

          <View style={{ position: "relative" }}>
            {/* <Text style={styles.inputfield}>Passenger(s)</Text> */}
            <TouchableOpacity
              onPress={() => setShowPassengerModal(true)}
              style={{ position: "relative" }}
            >
              <FontAwesome6
                name="user-large"
                style={styles.icon}
                size={24}
                color="#00A1BF"
              />
              {/* <Text
                style={{
                  color: searchData.passengers ? Colors.text : Colors.text2,
                }}
              >
                {searchData.passengers}{" "}
                {searchData.passengers === 1 ? "Passenger" : "Passengers"}
              </Text> */}
              <TextInput
                max="50"
                type="number"
                min="1"
                mode="outlined"
                value={searchData.passengers}
                // onChange={(e) => setPassenger(e.target.value)}
                onChangeText={(text) => handleInputChange("passengers", text)}
                placeholder="Passenger(s)"
                placeholderTextColor={Colors.text2}
                keyboardType="number"
                style={styles.input}
                cursorColor={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%" }}>
            <Button
              onPress={handleSearch}
              // disabled={isExploring}
              text={"Explore"}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: "5%", paddingBottom: "8%" }}>
          <Text
            style={{
              color: Colors.text,
              fontSize: 20,
              fontFamily: "PoppinsBold",
            }}
          >
            Popular Routes
          </Text>
          <View
            style={{
              marginHorizontal: "8%",
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              width: "100%",
              left: 0,
            }}
          >
            <View style={styles.box}>
              <Image
                source={require("../../assets/images/routeimg1.png")}
                resizeMode="cover"
                style={{ width: 90, height: 90 }}
              />
              <View style={{ gap: 5 }}>
                <Text style={styles.text}>Lagos - Portharcourt</Text>
                <Text style={styles.text}>6am</Text>
                <Text style={styles.price}>NGN 27,900</Text>
              </View>
            </View>

            <View
              style={[styles.box, { gap: 0, justifyContent: "space-between" }]}
            >
              <Image
                source={require("../../assets/images/routeimg2.png")}
                resizeMode="cover"
                style={{ width: 90, height: 90 }}
              />
              <View style={{ gap: 5, alignItems: "flex-start", width: 150 }}>
                <Text style={styles.text}>Lagos - Abuja</Text>
                <Text style={styles.text}>6am</Text>
                <Text style={styles.price}>NGN 28,900</Text>
              </View>
            </View>

            <View style={styles.box}>
              <Image
                source={require("../../assets/images/routeimg3.png")}
                resizeMode="cover"
                style={{ width: 90, height: 90 }}
              />
              <View style={{ gap: 5, alignItems: "flex-start", width: 150 }}>
                <Text style={styles.text}>Lagos - Enugu</Text>
                <Text style={styles.text}>6am</Text>
                <Text style={styles.price}>NGN 32,900</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
