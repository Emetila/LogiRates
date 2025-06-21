import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../styles";
import noteStyles from "../(home)/styles";
import { router } from "expo-router";




const Settings = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container2, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      <ScrollView>
        {/* Header */}
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
            <Pressable onPress={() =>{
              navigation.goBack();
            }}>
              <Image
                source={require("../../assets/images/Vector.png")}
                style={{ width: 20, height: 20, resizeMode: "contain"}}
              />
            </Pressable>
            <Text style={[noteStyles.authText, { color: 'white', fontSize: 32 }]}>Settings</Text>
            <Pressable onPress={() =>{
              router.push("/notification");
            }}> 
              <MaterialCommunityIcons name="bell-circle" size={28} color="white" />
            </Pressable>
          </View>
        </View>

        {/* White Content Card */}
        <View
          style={{
            marginHorizontal: "8%",
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
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
          {/* Profile */}
          <Pressable
            onPress={() =>{
              router.push("./profile");
            }}
            style={styles.box}
          >
            <MaterialCommunityIcons name="account" size={24} color="#4FBBD0" />
            <Text style={{ flex: 1, marginLeft: 10 }}>Profile</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
          </Pressable>

          {/* Change Password */}
          <Pressable
            onPress={() =>{
              router.push("/new-password");
            }}
            style={styles.box}
          >
            <MaterialCommunityIcons name="lock" size={24} color="#4FBBD0" />
            <Text style={{ flex: 1, marginLeft: 10 }}>Change Password</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
          </Pressable>

          {/* Notifications */}
          <Pressable
            onPress={() => router.push("/notification")}
            style={styles.box}
          >
            <MaterialCommunityIcons name="bell" size={24} color="#4FBBD0" />
            <Text style={{ flex: 1, marginLeft: 10 }}>Notifications</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
          </Pressable>

          {/* Dark Mode Toggle */}
          <View style={styles.box}>
            <MaterialCommunityIcons name="theme-light-dark" size={24} color="#4FBBD0" />
            <Text style={{ flex: 1, marginLeft: 10 }}>Dark Mode Theme</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>

          {/* Contact Us */}
          <Pressable
            onPress={() => router.push('/contact')}
            style={styles.box}
          >
            <MaterialCommunityIcons name="headphones" size={24} color="#4FBBD0" />
            <Text style={{ flex: 1, marginLeft: 10 }}>Contact Us</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
          </Pressable>

          {/* Logout */}
          <Pressable
            onPress={() => router.push("./logout")}
            style={styles.box}
          >
            <MaterialCommunityIcons name="logout" size={24} color="#4FBBD0" />
            <Text style={{ flex: 1, marginLeft: 10 }}>Log Out</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
