import { Text, View } from "react-native";
import { router } from "expo-router";
import StylizedButton from "@/src/components/global/button";

export default function Index() {
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
