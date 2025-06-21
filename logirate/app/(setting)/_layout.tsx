import { Stack } from "expo-router";

const SettingLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="contact" />
      <Stack.Screen name="changePassword" />
    </Stack>
  );
};

export default SettingLayout;
