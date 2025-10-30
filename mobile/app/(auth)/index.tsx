import { Text, View } from "react-native";
import { router } from "expo-router";
import StylizedButton from "@/src/components/global/button";
import { useEffect } from "react";
import { isConnected } from "@/src/api/auth";

export default function Index() {
  useEffect(() => {
    async function checkToken() {
      const connected = await isConnected();
      console.log("Connected:", connected);
      if (connected.success) {
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
