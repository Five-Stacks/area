import SearchModule from "@/src/components/tabs/dashboard/searchModule";
import AreaCard from "@/src/components/tabs/dashboard/areaCard";
import { FlatList, StyleSheet, View } from "react-native";
import Area from "@/src/types/area";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <SearchModule
        onQueryChange={(searchValues) => {
          console.log(searchValues);
        }}
      />
      <FlatList
        data={AreaList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AreaCard area={item} />}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  content: {
    padding: 14,
    gap: 10,
  },
});

const AreaList: Area[] = [
  {
    id: 1,
    user_id: 1,
    action_id: 1,
    reaction_ids: [1, 2, 3],
    config: {},
    is_active: true,
    created_at: new Date(),
  },
  {
    id: 2,
    user_id: 1,
    action_id: 2,
    reaction_ids: [2, 3],
    config: {},
    is_active: true,
    created_at: new Date(),
  },
  {
    id: 3,
    user_id: 1,
    action_id: 3,
    reaction_ids: [1, 3],
    config: {},
    is_active: false,
    created_at: new Date(),
  },
  {
    id: 4,
    user_id: 1,
    action_id: 1,
    reaction_ids: [1, 2, 3],
    config: {},
    is_active: true,
    created_at: new Date(),
  },
  {
    id: 5,
    user_id: 1,
    action_id: 2,
    reaction_ids: [2, 3],
    config: {},
    is_active: true,
    created_at: new Date(),
  },
  {
    id: 6,
    user_id: 1,
    action_id: 3,
    reaction_ids: [1, 3],
    config: {},
    is_active: true,
    created_at: new Date(),
  },
];
