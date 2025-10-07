import SearchModule, {
  SearchModuleValues,
} from "@/src/components/tabs/dashboard/searchModule";
import AreaCard from "@/src/components/tabs/dashboard/areaCard";
import { View, FlatList, StyleSheet } from "react-native";
import { getAreas } from "@/src/api/area";
import { useQuery } from "@tanstack/react-query";
import ApiStateHandler from "@/src/components/global/apiStateHandler";

export default function Dashboard() {
  const {
    data: areas,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
  });

  function updateListBySearch(searchValues: SearchModuleValues): void {
    console.log(searchValues);
    console.log(areas);
    refetch();
  }

  return (
    <View style={styles.container}>
      <SearchModule onQueryChange={updateListBySearch} />
      <ApiStateHandler isLoading={isLoading} error={error}>
        <FlatList
          data={areas}
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
