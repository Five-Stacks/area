import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Register screen</Text>
      <Link href={"/login"} style={{ color: "blue" }}>
        GOTO Login
      </Link>
    </View>
  );
}
