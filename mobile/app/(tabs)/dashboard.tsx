import SearchModule from "@/src/components/tabs/dashboard/searchModule";
import { globalColors } from "@/src/styles/global";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <SearchModule
        onQueryChange={(searchValues) => {
          console.log(searchValues);
        }}
      />
      <ScrollView style={styles.content} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.highlightBackground,
    marginTop: 30,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
