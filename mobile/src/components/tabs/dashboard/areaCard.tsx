import React, { useState } from "react";
import { StyleSheet, View, Image, Button, Modal, Text } from "react-native";
import Checkbox from "../../global/checkmark";
import Toggle from "../../global/toggle";
import { globalColors } from "@/src/styles/global";
import { Area } from "@/src/types/area";
import { deleteAreaById, updateArea } from "@/src/api/area";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Service } from "@/src/types/service";

import dotdotdotIcon from "@/assets/images/dotdotdotIcon.png";
import clockIcon from "@/assets/images/clockIcon.png";
import githubLogo from "@/assets/images/githubLogo.png";
import googleLogo from "@/assets/images/googleLogo.png";
import discordLogo from "@/assets/images/discordLogo.png";
import spotifyLogo from "@/assets/images/SpotifyLogo.png";
import twitterLogo from "@/assets/images/TwitterLogo.png";
import microsoftLogo from "@/assets/images/MicrosoftLogo.png";
import AreaActionsDropdown from "./AreaActionsDropdown";
import Input from "../../global/textinput";

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
  const [editingArea, setEditingArea] = useState<Area | null>(null);
  const queryClient = useQueryClient();

  const deleteAreaMutation = useMutation({
    mutationFn: (id: number) => deleteAreaById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });

  const editAreaMutation = useMutation({
    mutationFn: async (area: Area) => updateArea(area),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });

  const handleEdit = (area: Area) => {
    setEditingArea(area); // opens the modal
  };

  const handleModalSubmit = (updatedArea: Area) => {
    setEditingArea(null); // closes the modal
    editAreaMutation.mutate(updatedArea); // sends update
  };

  return (
    <View style={styles.container} underlayColor="#333">
      <>
        <View style={styles.content}>
          <View style={styles.row}>
            <Checkbox label={`AREA #${area.id}`} />
            <AreaActionsDropdown
              onRename={() => null}
              onEdit={() => handleEdit(area)}
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
            </View>
            <View>
              <Toggle
                width={65}
                value={area.is_active}
                onValueChange={(val) => {
                  area.is_active = val;
                  handleModalSubmit(area);
                }}
              />
            </View>
          </View>
        </View>
        {editingArea && (
          <EditAreaModal
            area={editingArea}
            onClose={() => setEditingArea(null)}
            onSubmit={handleModalSubmit}
          />
        )}
      </>
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

type EditAreaModalProps = {
  area: Area;
  onClose: () => void;
  onSubmit: (updatedArea: Area) => void;
};

function EditAreaModal({ area, onClose, onSubmit }: EditAreaModalProps) {
  const [formState, setFormState] = useState(area);

  return (
    <Modal transparent animationType="slide" visible>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#00000066",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 12 }}
        >
          <Input placeholder={`AREA #${area.id}`} onChangeText={() => null} />
          <Input
            placeholder="action id"
            onChangeText={(id) => {
              if (Number(id)) return (area.action_id = Number(id));
            }}
          />
          <Input
            placeholder="reaction id"
            onChangeText={(id) => {
              if (Number(id)) return (area.reaction_id = Number(id));
            }}
          />
          <Input
            placeholder="JSON config"
            onChangeText={(config) => {
              if (JSON.parse(config)) return (area.config = JSON.parse(config));
            }}
          />
          <View style={{ marginBottom: 15 }}>
            <Text>Is active</Text>
            <Toggle
              value={area.is_active}
              onValueChange={(val) => (area.is_active = val)}
            />
          </View>
          <Button title="Save" onPress={() => onSubmit(formState)} />
          <View style={{ height: 15 }} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

export default AreaCard;
