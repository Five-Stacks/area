import { Text, View } from "react-native";
import Dropdown from "@/src/components/global/dropdown";
import Input from "@/src/components/global/textinput";
import Checkbox from "@/src/components/global/checkmark";
import StylizedButton from "@/src/components/global/button";
import Toggle from "@/src/components/global/toggle";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Dashboard screen</Text>
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="Select an option"
      />
      <Input placeholder="Enter text" secureTextEntry={true} />
      <Input placeholder="Password" secureTextEntry={false} />
      <Checkbox label="Accept Terms and Conditions" />
      <StylizedButton
        label="Press Me"
        onPress={() => alert("Button Pressed!")}
      />
      <Toggle
        width={60}
        value={false}
        onValueChange={(val) => console.log("Toggle is now:", val)}
      />
    </View>
  );
}
