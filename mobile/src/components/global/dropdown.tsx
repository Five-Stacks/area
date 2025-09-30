import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type DropdownProps = {
    placeholder: string;
    options: string[];
  };
  

const Dropdown: React.FC<DropdownProps> = ({ placeholder, options }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
  
    return (
      <View style={styles.containerDropdown}>
        {/* Main button */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Text>{selectedValue || placeholder}</Text>
        </TouchableOpacity>
  
        {/* Options list */}
        {isOpen && (
          <View style={styles.dropdown}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => {
                  setSelectedValue(item);
                  setIsOpen(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };
  

const styles = StyleSheet.create({
    containerDropdown: {
        width: 200,
        marginTop: 20,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: "#fff",
        elevation: 5,
    },
    dropdownButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
  });

export default Dropdown;