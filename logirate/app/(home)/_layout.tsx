import { Stack } from "expo-router";

const HomeScreens = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="notification" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default HomeScreens;
