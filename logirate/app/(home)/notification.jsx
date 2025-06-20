import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import home  from "./styles";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Notification = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Chisco just updated the price for their luxirious vehicle. Check it out now.",
      time: "7:45 am",
    },
    {
      id: 2,
      text: "Peace mass transit has changed the time of depature of the second bus from 6:45 am to 7:10 am",
      time: "7:45 am",
    },
  ]);

  const options = ["Newest", "Oldest", "Select All"];

  const toggleFilter = (option) => {
    setSelectedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    setSelectedId(null);
  };

  return (
    <View style={styles.container2}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Header */}
          <View
            style={{
              backgroundColor: "#4FBBD0",
              height: 250,
              paddingTop: 60,
              paddingHorizontal: 20,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Pressable onPress={() => navigation.goBack()}>
                <Image
                  source={require("../../assets/images/Vector.png")}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                  }}
                />
              </Pressable>
              <Pressable onPress={() => setShowMenu(true)}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={28}
                  color="white"
                />
              </Pressable>
            </View>
            <Text
              style={[home.authText, { fontSize: 32, marginTop: 20 }]}
            >
              Notification
            </Text>
          </View>

          {/* Message Section */}
          <View style={{ paddingHorizontal: 20, paddingBottom: "8%" }}>
            <Text
              style={{
                color: Colors.text,
                fontSize: 20,
                fontFamily: "PoppinsRegular",
                marginTop: 10,
              }}
            >
              Today 7 June, 2025
            </Text>
            <View
              style={{
                marginHorizontal: "8%",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                width: "100%",
                left: 0,
              }}
            >
              {messages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.box,
                    {
                      backgroundColor: selectedId === msg.id ? "#eee" : "#fff",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      selectedId === msg.id
                        ? setSelectedId(null)
                        : setSelectedId(msg.id)
                    }
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Image
                      source={require("../../assets/images/profilephoto.png")}
                      resizeMode="cover"
                      style={{ width: 45, height: 45 }}
                    />
                    <View style={{ flex: 1, marginLeft: 4 }}>
                      <Text
                        style={[
                          home.formText,
                          { flexWrap: "wrap", flexShrink: 1 },
                        ]}
                      >
                        {msg.text}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: "PoppinsRegular" }}>
                      {msg.time}
                    </Text>
                  </Pressable>

                  {selectedId === msg.id && (
                    <TouchableOpacity
                      onPress={() => handleDelete(msg.id)}
                      style={{ marginLeft: 10 }}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        size={22}
                        color="red"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingBottom: "8%" }}>
            <Text
              style={{
                color: Colors.text,
                fontSize: 20,
                fontFamily: "PoppinsRegular",
                marginTop: 10,
              }}
            >
              Yesterday 6, June 2025
            </Text>

            <View
              style={{
                marginHorizontal: "8%",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                width: "100%",
                left: 0,
              }}
            >
              {messages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.box,
                    {
                      backgroundColor: selectedId === msg.id ? "#eee" : "#fff",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      selectedId === msg.id
                        ? setSelectedId(null)
                        : setSelectedId(msg.id)
                    }
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Image
                      source={require("../../assets/images/profilephoto.png")}
                      resizeMode="cover"
                      style={{ width: 45, height: 45 }}
                    />
                    <View style={{ flex: 1, marginLeft: 4 }}>
                      <Text
                        style={[
                          home.formText,
                          { flexWrap: "wrap", flexShrink: 1 },
                        ]}
                      >
                        {msg.text}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: "PoppinsRegular" }}>
                      {msg.time}
                    </Text>
                  </Pressable>

                  {selectedId === msg.id && (
                    <TouchableOpacity
                      onPress={() => handleDelete(msg.id)}
                      style={{ marginLeft: 10 }}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        size={22}
                        color="red"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingBottom: "8%" }}>
            <Text
              style={{
                color: Colors.text,
                fontSize: 20,
                fontFamily: "PoppinsRegular",
                marginTop: 10,
              }}
            >
              5, June 2025
            </Text>
            <View
              style={{
                marginHorizontal: "8%",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                width: "100%",
                left: 0,
              }}
            >
              {messages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.box,
                    {
                      backgroundColor: selectedId === msg.id ? "#eee" : "#fff",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 10,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      selectedId === msg.id
                        ? setSelectedId(null)
                        : setSelectedId(msg.id)
                    }
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Image
                      source={require("../../assets/images/profilephoto.png")}
                      resizeMode="cover"
                      style={{ width: 45, height: 45 }}
                    />
                    <View style={{ flex: 1, marginLeft: 4 }}>
                      <Text
                        style={[
                          home.formText,
                          { flexWrap: "wrap", flexShrink: 1 },
                        ]}
                      >
                        {msg.text}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: "PoppinsRegular" }}>
                      {msg.time}
                    </Text>
                  </Pressable>

                  {selectedId === msg.id && (
                    <TouchableOpacity
                      onPress={() => handleDelete(msg.id)}
                      style={{ marginLeft: 10 }}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        size={22}
                        color="red"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Modal for sort options */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            paddingTop: 75,
            paddingRight: 35,
          }}
          onPressOut={() => {
            setShowMenu(false);
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              paddingVertical: 10,
              width: 180,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Colors.text,
                paddingHorizontal: 15,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Sort by:
            </Text>
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleFilter(item)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 15,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 18,
                    height: 18,
                    marginLeft: 10,
                    marginTop: 3,
                    borderRadius: 3,
                    borderWidth: 1.5,
                    borderColor: "#ccc",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: selectedFilters.includes(item)
                      ? "#f0f0f0"
                      : "#fff",
                  }}
                >
                  {selectedFilters.includes(item) && (
                    <MaterialCommunityIcons
                      name="check"
                      size={12}
                      color="#555"
                    />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.text,
                    paddingLeft: 10,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Notification;
