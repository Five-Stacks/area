import React from "react";
import { StyleSheet, View, TouchableHighlight, Image } from "react-native";
import Checkbox from "../../global/checkmark";
import Toggle from "../../global/toggle";
import { globalColors } from "@/src/styles/global";
import { Area } from "@/src/types/area";
import { deleteAreaById } from "@/src/api/area";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import dotdotdotIcon from "@/assets/images/dotdotdotIcon.png";
import clockIcon from "@/assets/images/clockIcon.png";
import githubLogo from "@/assets/images/githubLogo.png";
import googleLogo from "@/assets/images/googleLogo.png";
import discordLogo from "@/assets/images/discordLogo.png";
import spotifyLogo from "@/assets/images/SpotifyLogo.png";
import twitterLogo from "@/assets/images/TwitterLogo.png";
import microsoftLogo from "@/assets/images/MicrosoftLogo.png";
import AreaActionsDropdown from "./AreaActionsDropdown";
import { Service } from "@/src/types/service";

type AreaCardProps = {
  area: Area;
  actionService: Service;
  reactionService: Service;
};

const AreaCard: React.FC<AreaCardProps> = ({
  area,
  actionService,
  reactionService,
}) => {
  const queryClient = useQueryClient();

  const deleteAreaMutation = useMutation({
    mutationFn: (id: number) => deleteAreaById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });

  return (
    <TouchableHighlight style={styles.container} underlayColor="#333">
      <View style={styles.content}>
        <View style={styles.row}>
          <Checkbox label={`AREA #${area.id}`} />
          <AreaActionsDropdown
            areaId={area.id}
            onDelete={() => deleteAreaMutation.mutate(area.id)}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.bottomLeft}>
            <Image
              style={styles.serviceIcon}
              source={matchServiceToIcon(actionService.name)}
            />
            <Image
              style={styles.serviceIcon}
              source={matchServiceToIcon(reactionService.name)}
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
          <View>
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

function matchServiceToIcon(name: string): any {
  switch (name) {
    case "timer":
      return clockIcon;
    case "google":
      return googleLogo;
    case "github":
      return githubLogo;
    case "discord":
      return discordLogo;
    case "spotify":
      return spotifyLogo;
    case "twitter":
      return twitterLogo;
    case "microsoft":
      return microsoftLogo;
    default:
      return dotdotdotIcon;
  }
}

export default AreaCard;
