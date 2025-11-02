import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import Input from "@/src/components/global/textinput";
import { getOAuthStatus } from "@/src/api/oauth";
import { API_URL } from "@/src/api/config";

const servicesData = [
  { id: "google", name: "Google", icon: require("@/assets/images/google.png") },
  { id: "github", name: "GitHub", icon: require("@/assets/images/github.png") },
  { id: "discord", name: "Discord", icon: require("@/assets/images/discord.png") },
  { id: "twitter", name: "Twitter", icon: require("@/assets/images/TwitterLogo.png") },
  { id: "spotify", name: "Spotify", icon: require("@/assets/images/SpotifyLogo.png") },
  { id: "microsoft", name: "Microsoft", icon: require("@/assets/images/MicrosoftLogo.png") },
];

export default function OAuthPage() {
  const [services, setServices] = useState(
    servicesData.map((s) => ({ ...s, connected: false })),
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(services);

  //useEffect(() => {
  //  const subscription = Linking.addEventListener('url', handleDeepLink);
  //  return () => subscription.remove();
  //}, []);
  //
//
  //const handleDeepLink = (event: { url: string }) => {
  //  const { url } = event;
  //
  //  // Extract serviceId from the URL if your backend includes it
  //  // Example: exp://.../services?service=google
  //  const parsed = Linking.parse(url);
  //  const serviceId = parsed.queryParams?.service;
  //
  //  if (serviceId) {
  //    // 1️⃣ Immediately mark this card as connected
  //    setServices(prev =>
  //      prev.map(s =>
  //        s.id === serviceId ? { ...s, connected: true } : s
  //      )
  //    );
  //
  //    // 2️⃣ Optionally refresh backend for accuracy
  //    fetchStatus();
  //  }
  //};
  

  const fetchStatus = async () => {
    try {
      const data = await getOAuthStatus();

      setServices((prev) =>
        prev.map((s) => ({ ...s, connected: !!data[s.id] })),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text === '') {
      setFilteredData(services);
    } else {
      const filtered = services.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleConnect = async (serviceId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const redirectUri = Linking.createURL('(tabs)/services');
      const connectURL = `${API_URL}/oauth/${serviceId}?redirect_to=${encodeURIComponent(redirectUri)}&token=${token}`;
    
      await WebBrowser.openBrowserAsync(connectURL);
      // No need to check `result.type === "success"`
      // Deep link listener handles updating the card
    } catch (error) {
      console.error("Error opening browser:", error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search services..."
        style={styles.searchInput}
        showSearchIcon={true}
        iconColor="#d0d0d0"
        onChangeText={handleSearch}
      />
      <Text style={styles.title}>Services</Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.connected && styles.cardConnected]}
            onPress={() => handleConnect(item.id)}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.serviceName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  row: { justifyContent: "space-around", marginBottom: 15 },
  card: {
    width: 150,
    height: 150,
    margin: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardConnected: { borderColor: "#4CAF50", backgroundColor: "#E8F5E9" },
  icon: { width: 40, height: 40, resizeMode: "contain", marginBottom: 10 },
  serviceName: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  status: {
    fontSize: 12,
    padding: 3,
    borderRadius: 5,
    color: "#fff",
  },
  searchInput: {
    borderColor: "#eff2f9",
    borderWidth: 4,
    width: 300,
    height: 45,
  },
});