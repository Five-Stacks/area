import { View, Text, StyleSheet } from "react-native";

const OrDivider = () => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>OR</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  line: {
    width: "40%",
    height: 1,
    backgroundColor: "#ccc", // or any color you want
  },
  text: {
    marginHorizontal: 8,
    color: "#888",
    fontWeight: "bold",
  },
});

export default OrDivider;
