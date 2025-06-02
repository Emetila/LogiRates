import { Stack } from "expo-router";

const AuthScreens = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthScreens;
