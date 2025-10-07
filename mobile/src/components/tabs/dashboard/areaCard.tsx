import React, { JSX } from "react";
import { StyleSheet, View, TouchableHighlight, Image } from "react-native";
import Checkbox from "../../global/checkmark";
import Toggle from "../../global/toggle";
import { globalColors } from "@/src/styles/global";
import Area from "@/src/types/area";

import clockIcon from "@/assets/images/clockIcon.png";
import githubLogo from "@/assets/images/githubLogo.png";
import googleLogo from "@/assets/images/googleLogo.png";
import discordLogo from "@/assets/images/discordLogo.png";
import spotifyLogo from "@/assets/images/SpotifyLogo.png";
import twitterLogo from "@/assets/images/TwitterLogo.png";
import microsoftLogo from "@/assets/images/MicrosoftLogo.png";
import dotdotdotIcon from "@/assets/images/dotdotdotIcon.png";

type AreaCardProps = {
  area: Area;
};

const AreaCard: React.FC<AreaCardProps> = ({ area }) => {
  return (
    <TouchableHighlight style={styles.container} underlayColor="#333">
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Checkbox label={`AREA #${area.id}`} />
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.bottomLeft}>
            <Image
              style={styles.serviceIcon}
              source={matchServiceToIcon(area.reaction_id)}
            />
            <Image
              style={styles.serviceIcon}
              source={matchServiceToIcon(area.action_id)}
            />
            {/* {area.reaction_id.map((value, index) => {
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
            })} */}
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

function matchServiceToIcon(id: number): any {
  switch (id) {
    case 1:
      return googleLogo;
    case 2:
      return githubLogo;
    case 3:
      return discordLogo;
    case 4:
      return spotifyLogo;
    case 5:
      return twitterLogo;
    case 6:
      return microsoftLogo;
    case 7:
      return clockIcon;
    default:
      return dotdotdotIcon;
  }
}

export default AreaCard;
