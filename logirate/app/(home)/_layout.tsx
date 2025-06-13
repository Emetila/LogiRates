import { Stack } from "expo-router";

const HomeScreens = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="notification" />
    </Stack>
  );
};

export default HomeScreens;
