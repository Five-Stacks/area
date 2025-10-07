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
      <Text>Login screen</Text>
      <Link href={"/register"} style={{ color: "blue" }}>
        Register
      </Link>
      <Link href={"/home"} style={{ color: "blue" }}>
        Login
      </Link>
    </View>
  );
}
