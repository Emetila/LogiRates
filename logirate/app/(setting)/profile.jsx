import {
      View,
      Text,
      Pressable,
      Image,
      Modal,
      TouchableOpacity
    } from "react-native";
    import { SafeAreaView } from "react-native-safe-area-context";
    import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
    import { useState } from "react";
    import * as ImagePicker from "expo-image-picker";

  
    
    const Profile = () => {
      const [showModal, setShowModal] = useState(false);
      const [profileImage, setProfileImage] = useState(
        require("../../assets/images/profilephoto.png")
      );
    
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
    
      return (
        <SafeAreaView>
          {/* Blue Header with Profile Info */}
          <View
            style={{
              backgroundColor: "#4FBBD0",
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              padding: 20,
              paddingTop: 60,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
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
                <Text style={{ fontSize: 20, fontWeight: "600", color: "#fff" }}>
                  Miracle Oghene
                </Text>
                <Text style={{ color: "#f0f0f0", marginTop: 3 }}>
                  miracle@gmail.com
                </Text>
                <Text style={{ color: "#f0f0f0", marginTop: 2 }}>
                  Location: Lagos
                </Text>
    
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
                  <Text style={{ color: "#4FBBD0", fontSize: 14 }}>
                    Edit Profile Picture
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
    
          {/* Bottom Sheet Modal */}
          <Modal
            visible={showModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowModal(false)}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
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
                {/* Close and Delete Icons */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <MaterialCommunityIcons name="close" size={28} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <MaterialCommunityIcons name="delete" size={28} color="red" />
                  </TouchableOpacity>
                </View>
    
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  Choose Profile Picture
                </Text>
    
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  {/* Gallery Option */}
                  <TouchableOpacity
                    onPress={pickFromGallery}
                    style={{
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "#4FBBD0",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 16,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="image"
                        size={36}
                        color="white"
                      />
                    </View>
                    <Text>Gallery</Text>
                  </TouchableOpacity>
    
                  {/* Camera Option */}
                  <TouchableOpacity
                    onPress={pickFromCamera}
                    style={{
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "#4FBBD0",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 16,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="camera"
                        size={36}
                        color="white"
                      />
                    </View>
                    <Text>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </SafeAreaView>   
  );
};

export default Profile;
