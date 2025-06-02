import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import onboarding from "./styles";
import Button from "../../components/ui/Button";
import { router } from "expo-router";

const OnboardingTwo = () => {
  return (
    <SafeAreaView style={onboarding.container}>
      <ScrollView>
        <View style={onboarding.imageBox}>
          <Image
            source={require("../../assets/images/logo2.png")}
            style={onboarding.logo}
          />
          <Text style={onboarding.title2}>
            1 Search. 1 Second. 1 Smart Choice.
          </Text>
        </View>
        <View style={onboarding.textBox}>
          <Image
            source={require("../../assets/images/onboarding.png")}
            style={onboarding.image}
          />
            <View>
              <Text style={onboarding.text2}></Text>
              Just tell us:
              <Text style={onboarding.text2}>Where from?</Text>
              <Text style={onboarding.text2}>Where to?</Text>
              <Text style={onboarding.text2}>What are you sending?</Text>
              <Text style={onboarding.text2}>
                And boom — you get real-time quotes from trusted logistics
                providers. Easy peasy.
              </Text>
            </View>
        </View>

        <View style={{ marginBottom: "10%" }}>
          <Button
            text={"Get Started"}
            onPress={() => {
              router.navigate("/signup");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingTwo;
