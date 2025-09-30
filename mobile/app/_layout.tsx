import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

// Prevent the splash screen from auto loading before all elements are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  var isConnected:boolean = false;

  const [fontsLoaded] = useFonts({
    "Inter-Thin": require("@/assets/fonts/Inter-Thin.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf")
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  return <Stack>
    {isConnected ?
      (<Stack.Screen name="(tabs)" />)
      : (<Stack.Screen name="(auth)" />)}
  </Stack>;
}
