import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import onboarding from "./styles";
import Button from "../../components/ui/Button";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const OnboardingOne = () => {
  return (
    <SafeAreaView style={onboarding.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: 80,
            paddingVertical: 10,
            alignSelf: 'flex-end'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/signup");
            }}
            style={{
              borderColor: Colors.primary,
              borderStyle: "solid",
              borderWidth: 2,
              borderRadius: 100,
              // width: 100,
            }}
          >
            <Text
              style={{
                color: Colors.text,
                fontFamily: "PoppinsMedium",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={onboarding.imageBox}>
          <Image
            source={require("../../assets/images/logo2.png")}
            style={onboarding.logo}
          />
          <Text style={onboarding.title}>Welcome to LogiRate</Text>
        </View>
        <View style={onboarding.textBox}>
          <Image
            source={require("../../assets/images/onboarding.png")}
            style={onboarding.image}
          />
          <Text style={onboarding.text}>
            We help you compare prices from top logistics companies across
            Nigeria — in seconds!
          </Text>
        </View>

        <View style={{ marginBottom: "10%" }}>
          <Button
            text={"Next"}
            onPress={() => {
              router.navigate("/onboarding2");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingOne;
