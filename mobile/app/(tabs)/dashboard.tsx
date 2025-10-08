import SearchModule, {
  SearchModuleValues,
} from "@/src/components/tabs/dashboard/searchModule";
import AreaCard from "@/src/components/tabs/dashboard/areaCard";
import { View, FlatList, StyleSheet } from "react-native";
import ApiStateHandler from "@/src/components/global/apiStateHandler";
import { useState } from "react";
import { useAreasWithRelations } from "@/src/hooks/useAreasWithRelations";

export default function Dashboard() {
  const [searchValues, setSearchValues] = useState<SearchModuleValues>();
  const { filteredAreas, isLoading, error } = useAreasWithRelations({
    filters: searchValues,
  });
  return (
    <View style={styles.container}>
      <SearchModule onQueryChange={setSearchValues} />
      <ApiStateHandler isLoading={isLoading} error={error}>
        <FlatList
          data={filteredAreas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AreaCard area={item} />}
          contentContainerStyle={styles.content}
        />
      </ApiStateHandler>
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
