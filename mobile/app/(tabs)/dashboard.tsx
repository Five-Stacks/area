import SearchModule from "@/src/components/tabs/dashboard/searchModule";
import AreaCard from "@/src/components/tabs/dashboard/areaCard";
import { View, FlatList, StyleSheet } from "react-native";
import ApiStateHandler from "@/src/components/global/apiStateHandler";
import { useFilteredAreas } from "@/src/hooks/useFilteredAreas";

export default function Dashboard() {
  const { filteredAreas, setFilters, isLoading, error } = useFilteredAreas();

  return (
    <View style={styles.container}>
      <SearchModule onQueryChange={setFilters} />
      <ApiStateHandler isLoading={isLoading} error={error}>
        <FlatList
          data={filteredAreas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AreaCard
              area={item}
              actionService={item.actionService}
              reactionService={item.reactionService}
            />
          )}
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
