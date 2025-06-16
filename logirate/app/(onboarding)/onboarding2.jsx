import { router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import onboarding from "./styles";

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
            source={require("../../assets/images/onboarding2.png")}
            style={onboarding.image}
          />
          <Text style={onboarding.text2}>
            Access up-to-the-minute pricing from multiple logistics providers..
          </Text>
        </View>

        <View style={{ marginBottom: "10%" }}>
          <Button
            text={"Next"}
            onPress={() => {
              router.navigate("/onboarding3");
            }}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingTwo;
