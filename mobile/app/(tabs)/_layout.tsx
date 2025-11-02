import { globalColors } from "@/src/styles/global";
import { router, Tabs } from "expo-router";
import { Image, StyleSheet, Text } from "react-native";

import ServiceIcon from "@/assets/images/serviceIcon.png";
import UserIcon from "@/assets/images/userIcon.png";
import AreaLogo from "@/assets/images/logo.png";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navbar,
        headerTitle: "App Title",
        headerLeft: () => (
          <Image
            source={AreaLogo}
            style={{ width: 100, marginLeft: 10 }}
            resizeMode="contain"
          />
        ),
        headerRight: () => (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "semibold",
              color: "white",
              marginRight: 10,
              backgroundColor: globalColors.blueText,
              borderRadius: 100,
              width: 40,
              height: 40,
              textAlign: "center",
              lineHeight: 40,
            }}
            onPress={() => router.back()}
          >
            X
          </Text>
        ),
      }}
    >
      <Tabs.Screen name="dashboard" options={{ href: null }} />
      <Tabs.Screen
        name="services"
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={ServiceIcon}
              style={{
                width: size * 2,
                height: size * 2,
                tintColor: focused ? globalColors.blueText : "black",
              }}
              resizeMode="contain"
            />
          ),
          tabBarLabelStyle: { color: "black", fontSize: 12 },
          tabBarLabel: "Services",
          headerTitleStyle: { fontSize: 24 },
          headerTitle: "Services",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="area"
        options={{
          tabBarIcon: () => null,
          tabBarIconStyle: { display: "none" },
          tabBarLabel: "+",
          tabBarLabelStyle: {
            fontSize: 30,
            color: "white",
            backgroundColor: globalColors.blueText,
            borderRadius: 100,
            width: 60,
            height: 60,
            textAlign: "center",
            lineHeight: 60,
            marginBottom: 30,
            transform: [{ translateY: -20 }],
            shadowColor: globalColors.shadow,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 10,
          },
          tabBarStyle: { display: "none" },
          headerTitleStyle: { fontSize: 24 },
          headerTitle: "Edition",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={UserIcon}
              style={{
                width: size * 1.1,
                height: size * 1.1,
                tintColor: focused ? globalColors.blueText : "black",
              }}
              resizeMode="contain"
            />
          ),
          tabBarLabelStyle: { color: "black", fontSize: 12 },
          tabBarLabel: "Account",
          headerTitleStyle: { fontSize: 24 },
          headerTitle: "Settings",
          headerShown: true,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navbar: {
    // iOS shadow
    shadowColor: globalColors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 10,

    paddingTop: 5,
  },
});
