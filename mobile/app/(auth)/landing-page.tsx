import { Text, View } from "react-native";
import { Link, useNavigation } from "expo-router";
import { globalTextSize, globalTextStyle } from "@/src/styles/global";
import StylizedButton from "@/src/components/global/button";

export default function Index() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Landing page</Text>
      <StylizedButton
        label="Log In"
        onPress={() => navigation.navigate("login")}
      />
    </View>
  );
}
