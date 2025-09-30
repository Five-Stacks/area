import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type CheckboxProps = {
  label: string; // text to display
  initialValue?: boolean; // optional starting state
  onChange?: (value: boolean) => void; // callback when toggled
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  initialValue = false,
  onChange,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(initialValue);

  const toggleCheckbox = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", margin: 5 },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#555",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: { fontSize: 16 },
});

export default Checkbox;
