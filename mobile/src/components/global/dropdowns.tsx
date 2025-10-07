import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { globalColors } from "@/src/styles/global";

export type StylizedDropdownItem = {
  label: string;
  value: string;
};

type StylizedDropdownProps = {
  data: StylizedDropdownItem[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

const StylizedDropdown: React.FC<StylizedDropdownProps> = ({
  data,
  value,
  placeholder,
  onValueChange,
  style,
}: StylizedDropdownProps) => {
  const [selected, setSelected] = useState(value || "");

  const handleChange = (item: { label: string; value: string }) => {
    setSelected(item.value);
    onValueChange?.(item.value);
  };

  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      value={selected}
      placeholder={placeholder}
      onChange={handleChange}
      style={[style, styles.container]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 8,
    borderColor: "#999",
  },
});

export default StylizedDropdown;
