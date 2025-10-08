import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, ViewStyle, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import dropdownIcon from "@/assets/images/dotdotdotIcon.png";
import renameIcon from "@/assets/images/renameIcon.png";
import editIcon from "@/assets/images/pencilIcon.png";
import deleteIcon from "@/assets/images/trashIcon.png";
import { globalTextSize, globalTextStyle } from "@/src/styles/global";

type DropdownItem = {
  label: string;
  value: "edit" | "rename" | "delete";
  icon: any;
};
interface AreaActionsDropdownProps {
  areaId: number;
  onEdit?: (id: number) => void;
  onRename?: (id: number) => void;
  onDelete?: (id: number) => void;
  style?: ViewStyle;
}

const dropdownItems: DropdownItem[] = [
  { label: "Rename", value: "rename", icon: renameIcon },
  { label: "Edit", value: "edit", icon: editIcon },
  { label: "Delete", value: "delete", icon: deleteIcon },
];

const AreaActionsDropdown: React.FC<AreaActionsDropdownProps> = ({
  areaId,
  onEdit,
  onRename,
  onDelete,
  style,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleDropdownChange = (item: DropdownItem) => {
    setSelected(item.value);
    setTimeout(() => setSelected(null), 1);

    switch (item.value) {
      case "edit":
        onEdit?.(areaId);
        break;
      case "rename":
        onRename?.(areaId);
        break;
      case "delete":
        Alert.alert(
          "Confirm deletion",
          "Are you sure you want to delete this area?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => onDelete?.(areaId),
            },
          ],
        );
        break;
    }
  };

  return (
    <Dropdown
      data={dropdownItems}
      labelField="label"
      valueField="value"
      value={selected}
      onChange={handleDropdownChange}
      placeholder=""
      style={[styles.dropdown, style]}
      selectedTextStyle={{ color: "white" }}
      renderRightIcon={() => (
        <Image source={dropdownIcon} style={styles.dropdownIcon} />
      )}
      renderItem={(item: DropdownItem) => (
        <View style={styles.item}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={(globalTextStyle.regular, globalTextSize.small)}>
            {item.label}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 100,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 10,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default AreaActionsDropdown;
