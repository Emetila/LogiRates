import {
  View,
  Text,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import authStyles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require("../../assets/images/profilephoto.png")
  );

  const [fields, setFields] = useState({
    name: "",
    email: "miracle@gmail.com",
    address: "123 Lagos Street",
    phone: "+2348012345678",
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const startEditing = (field, value) => {
    setEditField(field);
    setTempValue(value);
  };

  const saveField = () => {
    setFields({ ...fields, [editField]: tempValue });
    setEditField(null);
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
      setShowModal(false);
    }
  };

  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
      setShowModal(false);
    }
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("username");
        if (storedName) {
          setFields((prev) => ({ ...prev, name: storedName }));
        } else {
          setFields((prev) => ({ ...prev, name: "Miracle Oghene" }));
        }
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    };
    fetchUserName();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#4FBBD0",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            padding: 20,
            paddingTop: 60,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
            Profile
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Image
              source={profileImage}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: "#fff" }}>{fields.name}</Text>
              <Text style={{ color: "#f0f0f0", marginTop: 3 }}>{fields.email}</Text>
              <Text style={{ color: "#f0f0f0", marginTop: 2 }}>Location: Lagos</Text>

              <Pressable
                onPress={() => setShowModal(true)}
                style={{
                  marginTop: 8,
                  backgroundColor: "#fff",
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  borderRadius: 8,
                  alignSelf: "flex-start",
                }}
              >
                <Text style={{ color: "#4FBBD0", fontSize: 14 }}>Edit Profile Picture</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={{ padding: 25, gap: 20 }}>
          {[{ label: "Name", field: "name", icon: "account" },
            { label: "Email", field: "email", icon: "email" },
            { label: "Address", field: "address", icon: "map-marker" },
            { label: "Phone", field: "phone", icon: "phone" },
            { label: "Password", field: "password", icon: "lock" }].map(({ label, field, icon }) => (
            <View key={field}>
              <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 6, marginLeft: 8 }}>{label}</Text>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 16,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}>
                <MaterialCommunityIcons name={icon} size={24} color="#4FBBD0" style={{ marginRight: 25 }} />
                {editField === field ? (
                  <TextInput
                    value={tempValue}
                    onChangeText={setTempValue}
                    placeholder=""
                    style={[authStyles.input2, { flex: 1, borderRadius: 8 }]}
                    cursorColor={Colors.primary}
                    keyboardType={field === "phone" ? "phone-pad" : "default"}
                  />
                ) : (
                  <Text style={{ color: "#555", fontSize: 15, flex: 1 }}>{field === "password" ? "••••••••" : fields[field]}</Text>
                )}
                {field === "password" ? (
                  <Pressable onPress={() => router.push("/new-password")}> 
                    <Text style={{ color: "#4FBBD0", fontSize: 14 }}>Edit</Text>
                  </Pressable>
                ) : editField !== field ? (
                  <Pressable onPress={() => startEditing(field, fields[field])}>
                    <Text style={{ color: "#4FBBD0", fontSize: 14 }}>Edit</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={saveField} style={{ marginLeft: 10 }}>
                    <MaterialCommunityIcons name="check-circle" size={24} color="#4FBBD0" />
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>

        <Modal
          visible={showModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}
            activeOpacity={1}
            onPressOut={() => setShowModal(false)}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: 40,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <MaterialCommunityIcons name="close" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <MaterialCommunityIcons name="delete" size={28} color="red" />
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 20 }}>
                Choose Profile Picture
              </Text>

              <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                <TouchableOpacity onPress={pickFromGallery} style={{ alignItems: "center", gap: 8 }}>
                  <View style={{ width: 80, height: 80, backgroundColor: "#4FBBD0", justifyContent: "center", alignItems: "center", borderRadius: 16 }}>
                    <MaterialCommunityIcons name="image" size={36} color="white" />
                  </View>
                  <Text>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={pickFromCamera} style={{ alignItems: "center", gap: 8 }}>
                  <View style={{ width: 80, height: 80, backgroundColor: "#4FBBD0", justifyContent: "center", alignItems: "center", borderRadius: 16 }}>
                    <MaterialCommunityIcons name="camera" size={36} color="white" />
                  </View>
                  <Text>Camera</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
