import React from "react";
import { StyleSheet, View, TouchableHighlight, Image } from "react-native";
import Checkbox from "../../global/checkmark";
import Toggle from "../../global/toggle";
import { globalColors } from "@/src/styles/global";
import Area from "@/src/types/area";

import googleIcon from "@/assets/images/googleIcon.png";
import clockIcon from "@/assets/images/clockIcon.png";
import discordIcon from "@/assets/images/discordIcon.png";
import dotdotdotIcon from "@/assets/images/dotdotdotIcon.png";

type AreaCardProps = {
  area: Area;
};

const AreaCard: React.FC<AreaCardProps> = ({ area }) => {
  return (
    <TouchableHighlight style={styles.container} underlayColor="#333">
      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          <Checkbox label="Incroyable nom" />
        </View>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View style={styles.bottomLeft}>
            {area.reaction_ids.map((value, index) => {
              if (index < 2) {
                return (
                  <Image
                    key={index}
                    style={styles.serviceIcon}
                    source={
                      serviceIcons[Math.min(value - 1, serviceIcons.length - 1)]
                    }
                  />
                );
              } else if (index === 2) {
                return (
                  <Image
                    key={index}
                    style={styles.serviceIcon}
                    source={dotdotdotIcon}
                  />
                );
              }
            })}
            {/* Left bottom content (e.g. icons) */}
          </View>
          <View style={styles.bottomRight}>
            <Toggle width={65} value={area.is_active} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
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
  topRow: {
    alignItems: "flex-start", // top right
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between", // bottom left & right
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
  bottomRight: {},
  serviceIcon: {
    padding: 3,
    width: 20,
    height: 20,
    borderColor: globalColors.darkGray,
  },
});

const serviceIcons: number[] = [googleIcon, clockIcon, discordIcon];

export default AreaCard;
