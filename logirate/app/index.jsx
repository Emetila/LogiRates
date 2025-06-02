import Colors from "@/constants/Colors";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const splashScreens = [
  // {
  //   id: 1,
  //   backgroundColor: Colors.primary,
  //   image: require("../assets/images/splash1.png"),
  // },
  {
    id: 1,
    backgroundColor: Colors.white,
    image: require("../assets/images/logo.png"),
  },
  {
    id: 2,
    backgroundColor: Colors.white,
    image: require("../assets/images/logo2.png"),
  },
];
export default function NotFoundScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < splashScreens.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        router.navigate('/onboarding1')
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentIndex]);
  const splash = splashScreens[currentIndex];
  return (
    <SafeAreaView>
      <View style={[styles.container, {backgroundColor: splash.backgroundColor}]}>
        <Image source={splash.image} style={styles.image} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    alignItems: 'center',
    width: 200,
    resizeMode: 'contain',
    justifyContent: 'center',
    marginVertical: 'auto'

  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
