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

const API_URL = "https://logirate-api.onrender.com/vendors/allvendors-with-routes";

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
        Alert.alert("Error", "Failed to fetch vendors. Please try again later.");
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
    const filtered = vendors.filter(vendor => {
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
                <Text style={styles.companyName}>{item.companyName || "Unknown Company"}</Text>
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
                <Text style={styles.emptySubtext}>Try a different search term</Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  noLogo: {
    width: 150,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    marginBottom: 12,
    borderRadius: 4,
  },
  noLogoText: {
    color: Colors.darkGray,
  },
  detailsButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  detailsButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.darkGray,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  errorText: {
    color: Colors.error,
    padding: 20,
    textAlign: 'center',
  },
});