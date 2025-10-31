import { logout } from "@/src/api/auth";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile screen</Text>
      <Text
        onPress={() => {
          logout();
          setTimeout(() => router.replace("/"), 1000);
        }}
        style={{ marginTop: 20, color: "blue" }}
      >
        Logout
      </Text>
    </View>
  );
}
