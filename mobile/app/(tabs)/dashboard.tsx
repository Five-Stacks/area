import SearchModule, {
  SearchModuleValues,
} from "@/src/components/tabs/dashboard/searchModule";
import AreaCard from "@/src/components/tabs/dashboard/areaCard";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getAreas } from "@/src/api/area";
import { useQuery } from "@tanstack/react-query";
import { globalTextStyle } from "@/src/styles/global";

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
    refetch();
  }

  return (
    <View style={styles.container}>
      <SearchModule onQueryChange={updateListBySearch} />
      {isLoading && (
        <ActivityIndicator size={"large"} style={styles.activityIndicator} />
      )}
      {error && (
        <Text style={[globalTextStyle.medium, styles.errorText]}>
          Error fetching areas: {"\n"}
          {error.message}
        </Text>
      )}
      {!isLoading && areas && (
        <FlatList
          data={areas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AreaCard area={item} />}
          contentContainerStyle={styles.content}
        />
      )}
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
