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
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "@/components/ui/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import transportCompanies from "../(home)/vehicledata";
// import {format} from "date-fns"

const { width, height } = Dimensions.get("window");

// const apiClient = axios.create({
//   baseURL: "https://logirate-api.onrender.com",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// apiClient.interceptors.response.use(
//   (response) => {
//     console.log("API Response Success:", {
//       status: response.status,
//       url: response.config.url,
//       dataType: typeof response.data,
//       dataKeys: response.data ? Object.keys(response.data) : [],
//     });
//     return response;
//   },
//   (error) => {
//     console.error("API Response Error:", {
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       data: error.response?.data,
//       message: error.message,
//       url: error.config?.url,
//       fullURL: error.config
//         ? `${error.config.baseURL}${error.config.url}`
//         : "Unknown",
//     });
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.request.use(
//   (config) => {
//     const fullURL = `${config.baseURL}${config.url}`;
//     console.log("API Request:", {
//       method: config.method?.toUpperCase(),
//       fullURL,
//       params: config.params,
//       data: config.data,
//     });
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// const searchTransport = async (searchData) => {
//   try {
//     console.log("Searching with data:", searchData);
//     if (!searchData.from || !searchData.to || !searchData.passengers) {
//       throw new Error("Missing required fields: from, to, or passengers");
//     }

//     // Format the date properly if provided
//     let formattedDate = searchData.departureDate;
//     if (formattedDate && typeof formattedDate === "string") {
//       // Ensure date is in YYYY-MM-DD format
//       const dateObj = new Date(formattedDate);
//       if (!isNaN(dateObj.getTime())) {
//         formattedDate = dateObj.toISOString().split("T")[0];
//       }
//     }

//     const params = {
//       from: searchData.from.trim(),
//       to: searchData.to.trim(),
//       passengers: parseInt(searchData.passengers) || 1,
//     };

//     // Only add date if it's provided
//     if (formattedDate) {
//       params.departureDate = formattedDate;
//     }

//     console.log("API Params:", params);

//     const response = await apiClient.get("/vendors/allvendors-with-routes", {
//       params,
//     });

//     console.log("Search response received:", response.data);

//     // Handle different response structures
//     if (response.data) {
//       return response.data.results || response.data.data || response.data;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error("Search API Error Details:", {
//       message: error.message,
//       response: error.response?.data,
//       status: error.response?.status,
//       config: error.config,
//     });

//     if (error.response) {
//       // Server responded with an error status
//       const status = error.response.status;
//       const message =
//         error.response.data?.message ||
//         error.response.data?.error ||
//         "Server error occurred";

//       if (status === 404) {
//         throw new Error(
//           "Transport search service not found. Please contact support."
//         );
//       } else if (status === 400) {
//         throw new Error(`Invalid search parameters: ${message}`);
//       } else if (status === 500) {
//         throw new Error(
//           "Server is currently unavailable. Please try again later."
//         );
//       } else {
//         throw new Error(`Server Error (${status}): ${message}`);
//       }
//     } else if (error.request) {
//       // Network error
//       throw new Error(
//         "Network Error: Please check your internet connection and try again."
//       );
//     } else {
//       // Other error
//       throw new Error(
//         error.message || "Something went wrong. Please try again."
//       );
//     }
//   }
// };

// const getTransportDetails = async (id) => {
//   try {
//     const response = await apiClient.get(`/transport/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Details API Error:", error);
//     if (error.response) {
//       throw new Error(
//         `Server Error: ${error.response.status} - ${
//           error.response.data.message || "Please try again"
//         }`
//       );
//     } else if (error.request) {
//       throw new Error("Network Error: Please check your internet connection");
//     } else {
//       throw new Error("Failed to load transport details");
//     }
//   }
// };

// const router = (useRouter = () => {
//   const [currentRoute, setCurrentRoute] = useState("/");
//   const [params, setParams] = useState({});

//   return {
//     push: (path, options = {}) => {
//       setCurrentRoute(path);
//       if (options.params) setParams(options.params);
//     },
//     back: () => {
//       if (currentRoute === "/details") setCurrentRoute("/explore");
//       else if (currentRoute === "/explore") setCurrentRoute("/");
//     },
//     pathname: currentRoute,
//     query: params,
//   };
// });

// let globalSearchData = {
//   from: "",
//   to: "",
//   departureDate: "",
//   passengers: "",
// };

// let globalSearchResults = [];
// let globalSelectedVehicle = null;
const Home = () => {
  // const [companies, setCompanies] = useState([]);
  // console.log(" Transport companies", transportCompanies[1]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [passenger, setPassenger] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState('10000');
  const [maxPrice, setMaxPrice] = useState('30000');
  // const [currentPage, setCurrentPage] = useState("explore");
  // const [searchResults, setSearchResults] = useState([]);
  // const [selectedVehicle, setSelectedVehicle] = useState(null);
  // const [searchData, setSearchData] = useState(globalSearchData);
  // const [showPassengerModal, setShowPassengerModal] = useState(false);
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

  // const getTransportData = async () => {
  //   try {
  //     const options = {
  //       method: "GET",
  //       url: "https://logirate-api.onrender.com/vendors/allvendors-with-routes",
  //     };

  //     const response = await axios.request(options);
  //     // console.log(' response from the api', response.data);
  //     setTransportCompanies(response.data);
  //   } catch (error) {
  //     console.log(" error", error);
  //   }
  // };

  // useEffect(() => {
  //   getTransportData();
  // }, []);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // const handleExplore = async () => {
  //   if (!searchData.from || !searchData.to || !searchData.passengers) {
  //     Alert.alert("Missing Information", "Please fill in all required fields");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const results = await searchTransport(searchData);
  //     router.push({
  //       pathname: "/explore",
  //       params: {
  //         results: JSON.stringify(results),
  //         searchData: JSON.stringify(searchData),
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Explore Error:", error);
  //     Alert.alert("Search Failed", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleExplores = () => {
  //   if (!searchData.from || !searchData.to || !searchData.passengers) {
  //     Alert.alert("Missing Information", "Please fill in all required fields");
  //     return;
  //   }

  //   const routeKey = `${searchData.from.toLowerCase()}-${searchData.to.toLowerCase()}`;
  //   const results = transportCompanies[routeKey] || [];
  //   globalSearchResults = results;

  //   router.push("/explore", {
  //     params: {
  //       from: searchData.from,
  //       to: searchData.to,
  //       passengers: searchData.passengers,
  //     },
  //   });
  // };

  const handleConfirm = (date) => {
    const formatted = date.toISOString().split("T")[0]; // "yyyy-MM-dd"
    setDeparture(formatted);
    hideDatePicker();
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentPage("details");
  };

  const handleExplore = () => {
  if (!from || !to || !departure || !passenger) {
    Alert.alert("Missing Info", "Please fill all fields before searching");
    return;
  }

  router.push({
    pathname: "/explore",
    params: {
      from,
      to,
      departure,
      passenger,
      minPrice,
      maxPrice,
      departureTime: "08:00",
      arrivalTime: "18:00",
      vehicleType: "Bus",
    },
  });
};


  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView>
        <Stack.Screen options={{ title: 'Search Transport' }} />
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
                router.push("/messages");
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
                value={from}
                // onChange={(e) => setFrom(e.target.value)}
                onChangeText={setFrom}
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
                value={to}
                // onChange={(e) => setTo(e.target.value)}
                onChangeText={setTo}
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

              <TextInput
                max="50"
                type="number"
                min="1"
                mode="outlined"
                value={passenger}
                // onChange={(e) => setPassenger(e.target.value)}
                onChangeText={setPassenger}
                placeholder="Passenger(s)"
                placeholderTextColor={Colors.text2}
                keyboardType="numeric"
                style={styles.input}
                cursorColor={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              { width: "100%" },
              // !searchData.from || !searchData.to || !searchData.passengers,
            ]}
          >
            <Button
              onPress={handleExplore}
              disabled={loading}
          
              // disabled={isExploring}
              text={loading ? "Searching..." : "Explore"}
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
