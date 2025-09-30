import { Text, View } from "react-native";
import { Link } from "expo-router";
import { globalTextStyle } from "@/src/styles/global";

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
      <Link href={"/login"} style={globalTextStyle.thin}>THIN text</Link>
      <Link href={"/login"} style={globalTextStyle.regular}>REGULAR text</Link>
      <Link href={"/login"} style={globalTextStyle.medium}>MEDIUM text</Link>
      <Link href={"/login"} style={globalTextStyle.bold}>BOLD text</Link>
      <Link href={"/login"} style={globalTextStyle.regular}>GOTO login</Link>
    </View>
  );
}
