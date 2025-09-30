import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

<Ionicons name="eye" size={20} color="gray" />;

type InputProps = {
  onChangeText: (text: string) => void;
  value?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}: InputProps) => {
  const { inputStyle, containerStyle } = styles;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={containerStyle}>
      <TextInput
        style={inputStyle}
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
            color="gray"
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
  },
  containerStyle: {
    height: 60,
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 25,
    top: 25,
  },
});

export default Input;
