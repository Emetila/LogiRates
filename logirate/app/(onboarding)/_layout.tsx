import { Stack } from "expo-router";

const OnboardingScreens = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="onboarding1" />
      <Stack.Screen name="onboarding2" />
    </Stack>
  );
};

export default OnboardingScreens;
