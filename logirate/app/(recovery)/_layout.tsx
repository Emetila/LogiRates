import { Stack } from "expo-router";

const RecoverAccountScreens = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="new-password" />
      <Stack.Screen name="otp1" />
      <Stack.Screen name="otp2" />
    </Stack>
  );
};

export default RecoverAccountScreens;
