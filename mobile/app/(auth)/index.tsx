import { Text, View } from "react-native";
import { router } from "expo-router";
import StylizedButton from "@/src/components/global/button";
import { getItemAsync } from "expo-secure-store";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    async function checkToken() {
      const isConnected = await getItemAsync("isConnected");
      if (isConnected === "true") {
        router.replace("/(tabs)/dashboard");
      }
    }

    checkToken();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Landing page</Text>
      <StylizedButton label="Log In" onPress={() => router.push("/login")} />
    </View>
  );
}
