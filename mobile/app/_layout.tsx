import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "react-native-screens";

// Prevent the splash screen from auto loading before all elements are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let isConnected: boolean = false;

  const [fontsLoaded, error] = useFonts({
    "Inter-Thin": require("@/assets/fonts/Inter-Thin.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      console.log("Fonts loaded, splashscreen hidden !");
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (error)
      console.error("Problem occurend while loading fonts:" + error.message);
  }, [error]);

  return (
    <Stack>
      {isConnected ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
