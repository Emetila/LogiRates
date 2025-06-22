// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import authStyle from "../(auth)/style";
// import { Feather } from "@expo/vector-icons";
// import Colors from "@/constants/Colors";
// import { router } from "expo-router";

// const API_URL =
//   "https://logirate-api.onrender.com/vendors/allvendors-with-routes";

// export default function SearchScreen() {
//   const [query, setQuery] = useState("");
//   const [vendors, setVendors] = useState([]);
//   const [filteredVendors, setFilteredVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//   const fetchVendors = async () => {
//     try {
//       const res = await fetch(API_URL);
//       const json = await res.json();
//       console.log('Fetched vendors:', json.length, json[0]);
//       setVendors(json);
//       setFilteredVendors(json);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchVendors();
// }, []);

// useEffect(() => {
//   // Auto-filter on query change
//   const q = query.toLowerCase();
//   const filtered = vendors.filter(v =>
//     v.companyName?.toLowerCase().includes(q)
//   );
//   console.log('Filtering for:', q, '=>', filtered.length);
//   setFilteredVendors(filtered);
// }, [query, vendors]);

//   return (
//     <SafeAreaView>
//       <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
//       <View
//         style={{
//           backgroundColor: "#4FBBD0",
//           height: 220,
//           paddingVertical: "10%",
//           paddingHorizontal: "5%",
//           borderBottomLeftRadius: 30,
//           borderBottomRightRadius: 30,
//         }}
//       >
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           <Text
//             style={[authStyle.authText, { fontSize: 30, paddingVertical: 20 }]}
//           >
//             Search for Operators
//           </Text>
//         </View>

//         <View style={{ flex: 1, padding: 16 }}>
//           <View>
//             <TextInput
//               placeholder="Search for Operator Here"
//               value={query}
//               onChangeText={setQuery}
//               style={[
//                 authStyle.input2,
//                 {
//                   backgroundColor: Colors.white,
//                   alignSelf: "center",
//                   width: "100%",
//                 },
//               ]}
//             />
//             <Feather
//               name="search"
//               size={24}
//               color="#00A1BF"
//               style={[authStyle.icon, { right: 10 }]}
//             />
//           </View>
//         </View>

//         {loading ? (
//           <ActivityIndicator size="large" color="#4FBBD0" />
//         ) : (
//           <FlatList
//             data={filteredVendors}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 {item.logo ? (
//                   <Image
//                     source={{ uri: item.logo }}
//                     style={styles.logo}
//                     resizeMode="contain"
//                   />
//                 ) : (
//                   <Text style={{ color: Colors.white }}>No Logo</Text>
//                 )}
//                 <TouchableOpacity
//                   // style={{
//                   //   color: Colors.primary,
//                   //   fontSize: 14,
//                   //   alignSelf: "flex-end",
//                   // }}
//                   onPress={() => handleViewDetails(item._id)}
//                 >
//                   <Text
//                     style={{
//                       color: Colors.primary,
//                       fontSize: 14,
//                       alignSelf: "flex-end",
//                     }}
//                   >
//                     View Details
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             ListEmptyComponent={
//               <Text
//                 style={{
//                   color: Colors.warning,
//                   paddingTop:10,
//                   paddingLeft: 30
//                 }}
//               >
//                 No results found.
//               </Text>
//             }
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     alignItems: "center",
//   },
//   logo: {
//     width: 120,
//     height: 60,
//     marginBottom: 12,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import authStyle from "../(auth)/style";
import Colors from "@/constants/Colors";

const API_URL =
  "https://logirate-api.onrender.com/vendors/allvendors-with-routes";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setVendors(json);
        setFilteredVendors(json);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    const filtered = vendors.filter((vendor) =>
      vendor?.companyName?.toLowerCase().includes(q)
    );
    setFilteredVendors(filtered);
  }, [query, vendors]);

  const handleDetails = (vendorId) => {
    navigation.navigate("VendorDetails", { vendorId });
  };
const Search = () => {
  // const [query, setQuery] = useState("");
  // const [filteredData, setFilteredData] = useState(transportCompanies);
  // useEffect(() => {
  //   const q = query.toLowerCase();
  //   const filtered = transportCompanies.filter((item) =>
  //     item.name.toLowerCase().includes(q)
  //   );
  //   setFilteredData(filtered);
  // }, [query]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View
        style={{
          backgroundColor: "#4FBBD0",
          height: 220,
          paddingVertical: "10%",
          paddingHorizontal: "5%",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[authStyle.authText, { fontSize: 30, paddingVertical: 20 }]}
          >
            Search for Operators
          </Text>
        </View>

        {/* <View style={{ flex: 1, padding: 16 }}> */}
        <View>
          <TextInput
            placeholder="Search for Operator Here"
            value={query}
            onChangeText={setQuery}
            style={[
              authStyle.input2,
              {
                backgroundColor: Colors.white,
                alignSelf: "center",
                width: "100%",
              },
            ]}
          />
          <Feather
            name="search"
            size={24}
            color="#00A1BF"
            style={[authStyle.icon, { right: 10 }]}
          />
        </View>
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search by Name"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
          <Feather name="search" size={20} color="#00A1BF" />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4FBBD0" />
        ) : (
          <FlatList
            data={filteredVendors}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.logo ? (
                  <Image source={{ uri: item.logo }} style={styles.logo} />
                ) : (
                  <Text>No Logo</Text>
                )}
                <TouchableOpacity
                  onPress={() => handleDetails(item._id)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>More Details</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: "center" }}>No results found.</Text>
            }
          />
        )}
      </View>
      {/* <View style={{ flex: 1, padding: 16 }}>
        <TextInput
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
          }}
        />

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
              }}
            >
              <Text>{item.name}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No results found.</Text>}
        />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  card: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 140,
    height: 70,
    marginBottom: 10,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#00A1BF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
