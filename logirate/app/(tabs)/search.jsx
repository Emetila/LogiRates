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
import axios from "axios";
import Colors from "@/constants/Colors";
import styles from "../styles";
import { router, useRouter } from "expo-router";

const API_URL =
  "https://logirate-api.onrender.com/vendors/allvendors-with-routes";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API response:", response.data);
        setVendors(response.data);
        setFilteredVendors(response.data);
      } catch (err) {
        console.error("API error:", err);
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
    if (searchTerm.trim() === "") {
      setFilteredVendors(vendors);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = vendors.filter((vendor) => {
      // Search by company name
      const shortName = vendor?.shortName?.toLowerCase() || "";
      const nameMatch = shortName.includes(term);

      // Search by location (routes)
      const locationMatch =
        vendor?.routes?.some((route) =>
          route?.location?.toLowerCase().includes(term)
        ) || false;

      return nameMatch || locationMatch;
    });

    console.log("Filtered results:", filtered);
    setFilteredVendors(filtered);
  }, [searchTerm, vendors]);

  const handleViewDetails = (vendorId) => {
    console.log("Attempting to navigate with vendorId:", vendorId);
    if (!vendorId) {
      Alert.alert("Error", "Vendor ID is missing");
      return;
    }
    router.push({
      pathname: "/details",
      params: { id: vendorId }, // Changed from vendorid to id
    });
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container2}>
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
            value={searchTerm}
            onChangeText={setSearchTerm}
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
            keyExtractor={(item) => item.id || item._id}
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
                  {item.name || "Unknown Company"}
                </Text>

                {/* {item.routes?.length > 0 && (
                  <View style={styles.locationsContainer}>
                    <Text style={styles.locationsTitle}>Locations:</Text>
                    {item.routes.slice(0, 3).map((route, index) => (
                      <Text key={`${item._id}-${index}`} style={styles.locationText}>
                        • {route.services}
                      </Text>
                    ))}
                    {item.routes.length > 3 && (
                      <Text style={styles.moreLocationsText}>
                        +{item.routes.length - 3} more
                      </Text>
                    )}
                  </View>
                )} */}

                <TouchableOpacity
                  onPress={() => handleViewDetails(item.id || item._id)}
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
                  {searchTerm
                    ? `No results for "${searchTerm}"`
                    : "Try searching by name or location"}
                </Text>
              </View>
            }
            contentContainerStyle={[
              styles.listContent,
              filteredVendors.length === 0 && styles.emptyListContent,
            ]}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
