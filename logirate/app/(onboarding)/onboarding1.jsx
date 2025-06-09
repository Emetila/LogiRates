import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import onboarding from "./styles";
import Button from "../../components/ui/Button";
import { router } from "expo-router";

const OnboardingOne = () => {
  return (
    <SafeAreaView style={onboarding.container}>
      <ScrollView>
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
              router.navigate("./onboarding2");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingOne;
