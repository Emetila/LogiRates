import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import transportCompanies from "../(home)/vehicledata";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(transportCompanies);
  useEffect(() => {
    const q = query.toLowerCase();
    const filtered = transportCompanies.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
    setFilteredData(filtered);
  }, [query]);

  return (
    <SafeAreaView>
      <View style={{ flex: 1, padding: 16 }}>
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
      </View>
    </SafeAreaView>
  );
};

export default Search;
