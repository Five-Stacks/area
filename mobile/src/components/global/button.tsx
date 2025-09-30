import { globalColors, globalTextSize, globalTextStyle } from "@/src/styles/global";
import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";

type StylizedButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const StylizedButton: React.FC<StylizedButtonProps> = ({
  label,
  onPress,
  leftElement,
  rightElement,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.content}>
        {leftElement && <View style={styles.side}>{leftElement}</View>}
        <Text style={[globalTextStyle.medium, globalTextSize.h3, styles.label]}>{label}</Text>
        {rightElement && <View style={styles.side}>{rightElement}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalColors.button,
    borderRadius: 100000,
    paddingHorizontal: 25,
    height: 54,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: globalColors.invertedText,
  },
  side: {
    marginHorizontal: 8,
  },
});

export default StylizedButton;
