import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Checkbox from "../../global/checkmark";
import Toggle from "../../global/toggle";
import { globalColors } from "@/src/styles/global";
import { Area } from "@/src/types/area";
import { matchServiceToIcon } from "@/src/utils/matchServiceNameToIcon";
import AreaActionsDropdown from "./AreaActionsDropdown";

type AreaCardProps = {
  area: Area;
  actionService: string;
  reactionService: string;
  updateArea: (area: Area) => void;
  deleteArea: (areaId: number) => void;
};

const AreaCard: React.FC<AreaCardProps> = ({
  area,
  actionService,
  reactionService,
  updateArea,
  deleteArea,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Checkbox label={area.config.name} />
          <AreaActionsDropdown
            onRename={() => null}
            onEdit={() => updateArea(area)}
            onDelete={() => deleteArea(area.id)}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.bottomLeft}>
            <Image
              style={styles.serviceIcon}
              source={matchServiceToIcon(actionService)}
            />
            <Image
              style={styles.serviceIcon}
              source={matchServiceToIcon(reactionService)}
            />
          </View>
          <View>
            <Toggle
              width={65}
              value={area.is_active}
              onValueChange={(val) => {
                updateArea({ ...area, is_active: val });
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: globalColors.highlightBackground,
  },
  content: {
    flex: 1,
    gap: 15,
    padding: 12,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  bottomLeft: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 5,
    padding: 3,
    gap: 3,
    borderColor: globalColors.darkGray,
  },
  icon: {
    width: 20,
    height: 20,
  },
  serviceIcon: {
    padding: 3,
    width: 20,
    height: 20,
    borderColor: globalColors.darkGray,
  },
});

export default AreaCard;
