import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import onboarding from "./styles";
import Colors from "@/constants/Colors";

const OnboardingThree = () => {
  return (
    <SafeAreaView style={onboarding.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: 80,
            paddingVertical: 10,
            alignSelf: "flex-end",
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
          <Text style={onboarding.title}>
            Pick Trips Budget Friendly Prices
          </Text>
        </View>
        <View style={onboarding.textBox}>
          <Image
            source={require("../../assets/images/onboarding3.png")}
            style={onboarding.image}
          />
          <Text style={onboarding.text2}>
            Save much more on trips fitting in your budget and get notified also
          </Text>
        </View>

        <View style={{ marginBottom: "10%" }}>
          <Button
            text={"Get Started"}
            onPress={() => {
              router.push("/signup");
            }}
            accessibilityLabel="Get started with signup"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingThree;
