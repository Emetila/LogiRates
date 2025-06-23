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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import styles from "../styles";

const API_URL =
  "https://logirate-api.onrender.com/vendors/allvendors-with-routes";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched vendors:", data.length);
        setVendors(data);
        setFilteredVendors(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        Alert.alert(
          "Error",
          "Failed to fetch vendors. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredVendors(vendors);
      return;
    }

    const q = query.toLowerCase();
    const filtered = vendors.filter((vendor) => {
      // Add optional chaining and fallback for companyName
      const companyName = vendor?.companyName?.toLowerCase() || "";
      return companyName.includes(q);
    });

    console.log("Filtered results:", filtered.length);
    setFilteredVendors(filtered);
  }, [query, vendors]);

  const handleViewDetails = (vendorId) => {
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

    if (error) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Search for Operators</Text>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={20}
              color={Colors.gray}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search for Operator Here"
              placeholderTextColor={Colors.gray}
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <FlatList
              data={filteredVendors}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  {item.logo ? (
                    <Image
                      source={{ uri: item.logo }}
                      style={styles.logo}
                      resizeMode="contain"
                      onError={() => console.log("Image load error")}
                    />
                  ) : (
                    <View style={styles.noLogo}>
                      <Text style={styles.noLogoText}>No Logo</Text>
                    </View>
                  )}
                  <Text style={styles.companyName}>
                    {item.companyName || "Unknown Company"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleViewDetails(item._id)}
                    style={styles.detailsButton}
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Feather name="search" size={48} color={Colors.gray} />
                  <Text style={styles.emptyText}>No operators found</Text>
                  <Text style={styles.emptySubtext}>
                    Try a different search term
                  </Text>
                </View>
              }
              contentContainerStyle={styles.listContent}
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
  };
}
