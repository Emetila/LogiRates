import { Stack } from "expo-router";
import { AuthProvider } from "./login";

const AuthScreens = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
      </Stack>
    </AuthProvider>
  );
};

export default AuthScreens;
