import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{headerShown: false}}/>
      <Tabs.Screen name="services" options={{headerShown: false}}/>
      <Tabs.Screen name="area" options={{headerShown: false}}/>
      <Tabs.Screen name="profile" options={{headerShown: false}}/>
    </Tabs>
  );
}
