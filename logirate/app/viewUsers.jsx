import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers !== null) {
          setUsers(JSON.parse(storedUsers));
        }
      } catch (e) {
        console.error("Failed to load users", e);
      }
    };

    loadUsers();
  }, []);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <ScrollView>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Signed-Up Users</Text>
        {users.length === 0 ? (
          <Text>No users signed up yet.</Text>
        ) : (
          users.map((user, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <Text>Name: {user.name}</Text>
              <Text>Email: {user.email}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewUsers;
