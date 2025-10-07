import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputProps = {
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  showSearchIcon?: boolean; // ✅ optional magnifying glass
  iconColor?: string; // ✅ customizable color
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  showSearchIcon = false,
  iconColor = "gray", // default
  style,
  containerStyle,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {showSearchIcon && (
        <Ionicons
          name="search"
          size={20}
          color={iconColor}
          style={styles.leftIcon}
        />
      )}

      <TextInput
        style={[styles.inputStyle, style, showSearchIcon && { paddingLeft: 35 }]} // space for icon
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color={iconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: "#000",
    fontSize: 15,
    margin: 15,
    height: 40,
    width: 250,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  containerStyle: {
    height: 60,
    alignItems: "center",
    marginBottom: 10,
  },
  leftIcon: {
    position: "absolute",
    left: 25,
    top: 25,
  },
  iconContainer: {
    position: "absolute",
    right: 25,
    top: 25,
  },
});

export default Input;
