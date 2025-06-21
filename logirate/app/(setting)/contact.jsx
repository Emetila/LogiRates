import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";

const Profile = () => {
  const [name, setName] = useState("Miracle");
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <ScrollView>
        {/* Header */}
        <View
          style={{
            backgroundColor: "#4FBBD0",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            padding: 20,
            paddingTop: 60,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ padding: 10, color: Colors.white2 }}
            >
              <Image
                source={require("../../assets/images/Vector.png")}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
              />
            </Pressable>
            <Image
              source={require("../../assets/images/earpod.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
            />
          </View>
          <Text
            style={{
              color: "#fff",
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Contact Us
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Image
              source={require("../../assets/images/profilephoto.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 30, fontWeight: "600", color: "#fff" }}>
                Hi, {name}
              </Text>
              <Text style={{ fontSize: 20, color: "#f0f0f0", marginTop: 3 }}>
                How can we help?
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 20,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            {/* Messages */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: Colors.text }}
              >
                Messages
              </Text>
              <Image
                source={require("../../assets/images/message-filled.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>

            {/* Help */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500", color: Colors.text }}
              >
                Help
              </Text>
              <Image
                source={require("../../assets/images/helpsymbol.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 10,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            {/* Send us a message */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
      
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily:"InterBold",
                    fontSize: 16,
                    fontWeight: "600",
                    marginBottom: 4,
                    color: Colors.text,
                  }}
                >
                  Send us a message
                </Text>
                <Text style={{ fontFamily:"PoppinsRegular", fontSize: 17, color: "#999999" }}>
                  We'll get back to you later today
                </Text>
              </View>
              <Text style={{ fontSize: 24, color: "#999999" }}>{">"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
