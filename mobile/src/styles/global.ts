import { StyleSheet } from "react-native";

export const globalColors = {
  background: "#EFF2F9",
  highlightBackground: "#FFFFFF",
  redBackground: "#8A3E49",
  text: "#20252B",
  invertedText: "#FFFFFF",
  blueText: "#6A74C9",
  redText: "#8A3E49",
  icon: "#20252B",
  button: "#6A74C9",
  buttonOn: "#74B9A9",
  buttonOff: "#F7DADE",
};

const globalFontFamilly = {
  InterThin: "Inter-Thin",
  InterRegular: "Inter-Regular",
  InterMedium: "Inter-Medium",
  InterBold: "Inter-Bold",
};

export const globalTextStyle = StyleSheet.create({
  thin: {
    fontSize: 16,
    color: globalColors.text,
    fontFamily: globalFontFamilly.InterThin,
  },
  regular: {
    fontSize: 16,
    color: globalColors.text,
    fontFamily: globalFontFamilly.InterRegular,
  },
  medium: {
    fontSize: 16,
    color: globalColors.text,
    fontFamily: globalFontFamilly.InterMedium,
  },
  bold: {
    fontSize: 16,
    color: globalColors.text,
    fontFamily: globalFontFamilly.InterBold,
  },
});

export const globalTextSize = StyleSheet.create({
  regular: {
    fontSize: 16,
  },
  h3: {
    fontSize: 20,
  },
  h2: {
    fontSize: 24,
  },
  h1: {
    fontSize: 30,
  },
});
