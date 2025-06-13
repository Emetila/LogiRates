import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import authStyles from "../(auth)/styles";
import Colors from "@/constants/Colors";
import { useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "@/components/ui/Button";

const Home = () => {
  const [from, setFrom] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   loadUserData();
  // }, []);

  // const loadUserData = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem("userData");
  //     if (userData) {
  //       const parsedUser = JSON.parse(userData);
  //       setUser(parsedUser);
  //     } else {
  //       // If no user data, redirect to login
  //       router.replace("/login");
  //     }
  //   } catch (error) {
  //     console.error("Error loading user data:", error);
  //     Alert.alert("Error", "Unable to load user data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getDisplayName = () => {
  //   if (!user) return "User";
  //   if (user.fullName) return user.fullName;
  //   if (user.displayName) return user.displayName;

  //   // Extract name from email if no full name
  //   const emailName = user.email?.split("@")[0];
  //   return emailName || "User";
  // };

  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.container2}>
  //       <View
  //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //       >
  //         <Text>Loading...</Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

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
              {/* <Text
              style={[authStyles.formText, { color: Colors.white, fontSize: 12, opacity: 0.8 }]}
            >
              {user?.email}
            </Text> */}
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
            <Text style={styles.inputfield}>From</Text>
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
                onChangeText={setFrom}
                style={styles.input}
                cursorColor={Colors.primary}
              />
              {/* {errors.name && (
            <Text style={authStyles.error}>{errors.fullName}</Text>
          )} */}
            </View>
          </View>

          <View style={{ position: "relative" }}>
            <Text style={styles.inputfield}>To</Text>
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
                onChangeText={setFrom}
                style={styles.input}
                cursorColor={Colors.primary}
              />
              {/* {errors.name && (
            <Text style={authStyles.error}>{errors.fullName}</Text>
          )} */}
            </View>
          </View>

          <View style={{ position: "relative" }}>
            <Text style={styles.inputfield}>Departure</Text>
            <View style={{ position: "relative" }}>
              <Ionicons
                name="calendar-clear"
                size={24}
                color="#00A1BF"
                style={styles.icon}
              />
              <TextInput
                label="from"
                mode="outlined"
                value={from}
                onChangeText={setFrom}
                style={styles.input}
                cursorColor={Colors.primary}
              />
              {/* {errors.name && (
            <Text style={authStyles.error}>{errors.fullName}</Text>
          )} */}
            </View>
          </View>

          <View style={{ position: "relative" }}>
            <Text style={styles.inputfield}>Passenger(s)</Text>
            <View style={{ position: "relative" }}>
              <FontAwesome6
                name="user-large"
                style={styles.icon}
                size={24}
                color="#00A1BF"
              />
              <TextInput
                label="from"
                mode="outlined"
                value={from}
                onChangeText={setFrom}
                style={styles.input}
                cursorColor={Colors.primary}
              />
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <Button
              text={"Explore"}
              onPress={() => {
                router.push("/explore");
              }}
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

            <View style={[styles.box, {gap: 0, justifyContent: "space-between"}]}>
              <Image
                source={require("../../assets/images/routeimg2.png")}
                resizeMode="cover"
                style={{ width: 90, height: 90 }}
              />
              <View style={{ gap: 5, alignItems: 'flex-start', width: 150 }}>
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
              <View style={{ gap: 5, alignItems: 'flex-start', width: 150 }}>
                <Text style={styles.text}>Lagos - Enugu</Text>
                <Text style={styles.text}>6am</Text>
                <Text style={styles.price}>NGN 32,900</Text>
              </View>
            </View>
          </View>
        </View>

        {/* <FlatList 
        renderItem={()=>{
          return (
            <View
            style={{
              marginHorizontal: "8%",
              paddingVertical: 15,
              paddingHorizontal: 5,
              borderRadius: 15,
              backgroundColor: Colors.white,
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              width: "100%",
              left: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 40,
              }}
            >
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
          </View>
          )
        }}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
