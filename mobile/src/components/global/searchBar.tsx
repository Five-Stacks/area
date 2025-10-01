import React, { useRef, useState } from "react";
import { Pressable, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  globalColors,
  globalTextSize,
  globalTextStyle,
} from "@/src/styles/global";

type SearchBarProps = {
  onSearch?: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch = (text: string) => null,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch?.(text);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable onPress={focusInput} style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[globalTextStyle.regular, globalTextSize.small, styles.input]}
        placeholder="Search..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={handleChange}
        returnKeyType="search"
      />
      <Ionicons
        onPress={focusInput}
        name="search"
        size={20}
        color="#999"
        style={styles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // input then icon
    alignItems: "center",
    backgroundColor: globalColors.highlightBackground,
    borderColor: "#999",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginLeft: 6,
  },
});

export default SearchBar;
