import { ImageBackground, StyleSheet, Text } from "react-native";

import AreaBG from "@/assets/images/areabg.png";
import AreaEdition from "@/src/components/tabs/area/areaEdition";
import { Area } from "@/src/types/area";

export default function Index() {
  return (
    <ImageBackground
      source={AreaBG}
      style={styles.mainView}
      resizeMode="repeat"
    >
      <AreaEdition area={dummyArea} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const dummyArea: Area = {
  id: 1,
  user_id: 1,
  action_id: 1,
  reaction_ids: [2, 3],
  config: {
    name: "My Area",
    trigger: {
      reactionChosenId: 1,
      service_name: "Github",
      name: "New Issue",
      datas_form: [
        {
          fieldId: 1,
          fieldName: "Repository",
          response: "",
        },
      ],
    },
    actions: [
      {
        service_name: "Discord",
        name: "Send Message",
        datas_form: [
          {
            fieldId: 1,
            fieldName: "Channel",
            response: "",
          },
          {
            fieldId: 2,
            fieldName: "Message",
            response: "",
          },
        ],
      },
      {
        service_name: "Google",
        name: "Send Email",
        datas_form: [
          {
            fieldId: 1,
            fieldName: "Recipient",
            response: "",
          },
          {
            fieldId: 2,
            fieldName: "Subject",
            response: "",
          },
          {
            fieldId: 3,
            fieldName: "Body",
            response: "",
          },
        ],
      },
    ],
  },
  is_active: true,
  created_at: new Date(),
};
