import SearchModule, {
  SearchModuleValues,
} from "@/src/components/tabs/dashboard/searchModule";
import AreaCard from "@/src/components/tabs/dashboard/areaCard";
import { View, FlatList, StyleSheet } from "react-native";
import { GlobalDataContext } from "@/src/context/globalData";
import { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "expo-router";

export default function Dashboard() {
  const { refreshAll, areas, updateArea, deleteArea, isLoading } =
    useContext(GlobalDataContext);

  const [searchModuleValues, setSearchModuleValues] =
    useState<SearchModuleValues>({});

  useFocusEffect(
    useCallback(() => {
      refreshAll();
    }, [refreshAll]),
  );

  const filteredAreas = areas.filter((area) => {
    let matches = true;

    if (searchModuleValues.query) {
      matches = matches && area.config.name.includes(searchModuleValues.query);
    }

    if (searchModuleValues.service) {
      matches =
        matches &&
        (area.config.trigger.service_name === searchModuleValues.service ||
          area.config.actions.service_name === searchModuleValues.service);
    }

    if (searchModuleValues.status !== undefined) {
      matches = matches && area.is_active === searchModuleValues.status;
    }

    return matches;
  });

  return (
    <View style={styles.container}>
      <SearchModule onQueryChange={setSearchModuleValues} />
      <FlatList
        data={filteredAreas}
        keyExtractor={(item) => item.config.name + item.id.toString()}
        renderItem={({ item }) => (
          <AreaCard
            area={item}
            actionService={item.config.trigger.service_name}
            reactionService={item.config.actions.service_name}
            updateArea={updateArea}
            deleteArea={deleteArea}
          />
        )}
        contentContainerStyle={styles.content}
        refreshing={isLoading}
        onRefresh={refreshAll}
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
  activityIndicator: {
    marginTop: 25,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 25,
  },
});
