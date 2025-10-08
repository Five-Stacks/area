import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="services" />
      <Tabs.Screen name="area" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
