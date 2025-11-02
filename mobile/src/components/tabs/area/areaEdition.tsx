import React from "react";
import { action, Area } from "@/src/types/area";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
} from "react-native";
import { matchServiceToIcon } from "@/src/utils/matchServiceNameToIcon";
import { globalColors, globalTextStyle } from "@/src/styles/global";
import PlusIcon from "@/assets/images/plus.png";
import { ActionEditorModal } from "./actionEditorModal";

export type AreaEditionProps = {
  area: Area;
};

export default function AreaEdition({ area }: AreaEditionProps) {
  const [localArea, setLocalArea] = React.useState<Area>(area);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  function moveAction(position: number, direction: "up" | "down") {
    if (direction === "up" && position <= 0) return;
    if (direction === "down" && position >= localArea.reaction_ids.length - 1)
      return;

    console.log("Moving action at position", position, "to", direction);
    // Swap pos in reactions_ids
    let newReactions_ids = [...localArea.reaction_ids];
    let a = newReactions_ids[position];

    if (direction === "down") {
      newReactions_ids[position] = newReactions_ids[position + 1];
      newReactions_ids[position + 1] = a;
    } else {
      newReactions_ids[position] = newReactions_ids[position - 1];
      newReactions_ids[position - 1] = a;
    }

    // Swap pos in actions[]
    let newActions = [...localArea.config.actions];
    let b = newActions[position];

    if (direction === "down") {
      newActions[position] = newActions[position + 1];
      newActions[position + 1] = b;
    } else {
      newActions[position] = newActions[position - 1];
      newActions[position - 1] = b;
    }

    // Apply changes
    setLocalArea({
      ...localArea,
      reaction_ids: newReactions_ids,
      config: { ...localArea.config, actions: newActions },
    });
  }

  function CreateAction(location: number) {
    console.log("Creating action at location", location);
    let newAction = {
      service_name: "",
      name: "",
      datas_form: [],
    };

    let updatedActions = [...localArea.config.actions];
    updatedActions.splice(location, 0, newAction);

    let updatedReactionsIds = [...localArea.reaction_ids];
    updatedReactionsIds.splice(location, 0, 0);

    setLocalArea({
      ...localArea,
      config: { ...localArea.config, actions: updatedActions },
      reaction_ids: updatedReactionsIds,
    });

    EditAction(location);
  }

  function EditAction(id: number) {
    setEditingIndex(id);
  }

  function CloseModal() {
    setEditingIndex(null);
  }

  function DeleteAction(id: number) {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this action?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedActions = localArea.config.actions.filter(
              (_, index) => index !== id,
            );
            const updatedReactionIds = localArea.reaction_ids.filter(
              (_, index) => index !== id,
            );

            setLocalArea({
              ...localArea,
              config: { ...localArea.config, actions: updatedActions },
              reaction_ids: updatedReactionIds,
            });
          },
        },
      ],
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <TriggerCard trigger={localArea.config.trigger} />
        <Separator onPress={() => CreateAction(0)} />
        {localArea.config.actions.map((action, index) => (
          <View key={index}>
            <ActionCard
              action={action}
              id={index}
              onPositionChange={(dir) => moveAction(index, dir)}
              onEdit={() => EditAction(index)}
              onDelete={() => DeleteAction(index)}
            />
            <Separator onPress={() => CreateAction(index + 1)} />
          </View>
        ))}
      </ScrollView>
      {editingIndex !== null && (
        <ActionEditorModal
          action={localArea.config.actions[editingIndex]}
          onClose={CloseModal}
          onSave={(updatedAction: action) => {
            const newActions = [...localArea.config.actions];
            newActions[editingIndex] = updatedAction;

            setLocalArea({
              ...localArea,
              config: { ...localArea.config, actions: newActions },
            });

            CloseModal();
          }}
        />
      )}
    </>
  );
}

type TriggerCardProps = {
  trigger: Area["config"]["trigger"];
};

function TriggerCard({ trigger }: TriggerCardProps) {
  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: globalColors.blueText,
          marginRight: 20,
          marginLeft: 20,
        },
      ]}
    >
      <View style={styles.topCard}>
        <Image
          source={matchServiceToIcon(trigger.service_name)}
          style={styles.cardImg}
        />
        <Text
          style={[globalTextStyle.bold, styles.cardTitle, { color: "white" }]}
        >
          1. {trigger.name}
        </Text>
      </View>
      <View style={styles.bottomCard}>
        <Button onPress={() => null} title="Edit" />
        <Button color={"red"} onPress={() => null} title="Delete" />
      </View>
    </Pressable>
  );
}

type ActionCardProps = {
  action: Area["config"]["actions"][0];
  id: number;
  onPositionChange: (movement: "up" | "down") => void;
  onEdit: () => void;
  onDelete: () => void;
};

function ActionCard({
  action,
  id,
  onPositionChange,
  onEdit,
  onDelete,
}: ActionCardProps) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.topCard}>
        <Image
          source={matchServiceToIcon(action.service_name)}
          style={styles.cardImg}
        />
        <Text style={[globalTextStyle.bold, styles.cardTitle]}>
          {id + 2}. {action.name}
        </Text>
      </View>
      <View style={styles.bottomCard}>
        <Button onPress={() => onPositionChange("up")} title="Up" />
        <Button onPress={() => onPositionChange("down")} title="Down" />
        <Button onPress={onEdit} title="Edit" />
        <Button color={"red"} onPress={onDelete} title="Delete" />
      </View>
    </Pressable>
  );
}

type SeparatorProps = {
  onPress: () => void;
};

function Separator({ onPress }: SeparatorProps) {
  return (
    <View style={styles.separator}>
      <View style={styles.separatorStroke} />
      <Pressable onPress={onPress}>
        <Image source={PlusIcon} style={styles.separatorImage}></Image>
      </Pressable>
      <View style={styles.separatorStroke} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    marginBottom: 50,
  },
  card: {
    height: 90,
    backgroundColor: "white",
    borderRadius: 10,

    // Android Shadow
    elevation: 5,

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 20,
    color: "black",
  },
  topCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  bottomCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  triggerTag: {},
  actionTag: {},
  cardImg: {
    width: 15,
    height: 15,
  },
  separator: {
    height: 80,
    overflow: "hidden",
    gap: 10,

    alignItems: "center",
    justifyContent: "center",

    alignSelf: "center",
  },
  separatorStroke: {
    height: 35,
    width: 3.5,
    backgroundColor: globalColors.blueText,
  },
  separatorImage: {
    width: 20,
    height: 20,

    backgroundColor: "transparent",
  },
});
