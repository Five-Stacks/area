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
import { API_URL } from "@/src/api/config";
import Input from "@/src/components/global/textinput";

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

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

  useEffect(() => {
    async function fetchStatus() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/oauth/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        setServices((prev) =>
          prev.map((s) => ({ ...s, connected: !!data[s.id] })),
        );
      } catch (err) {
        console.log("Error fetching OAuth status:");
        console.error(err);
      }
    }
    fetchStatus();

    // Listen for deep link callbacks
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    setFilteredData(services);
  }, [services]);

  const handleDeepLink = (event: { url: string }) => {
    const { url } = event;
    console.log("Deep link received:", url);
    
    if (url.includes('oauth-callback')) {
      // Extract service ID from the URL if needed
      // Update the connection status
      fetchStatus();
    }
  };

  const fetchStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_URL}/oauth/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      setServices((prev) =>
        prev.map((s) => ({ ...s, connected: !!data[s.id] })),
      );
    } catch (err) {
      console.log("Error fetching OAuth status:");
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
    const redirectUri = Linking.createURL('oauth-callback');
    console.log("Redirect URI:", redirectUri);

    const connectURL = `${API_URL}/oauth/${serviceId}?redirect_to=${encodeURIComponent(redirectUri)}`;
    console.log("Opening browser with URL:", connectURL);

    try {
      // Open the OAuth URL in the device's default browser
      const result = await WebBrowser.openBrowserAsync(connectURL);
      
      console.log("Browser result:", result);
      
      // Refresh status after browser closes
      if (result.type === 'cancel' || result.type === 'dismiss') {
        await fetchStatus();
      }
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
            <Text
              style={[
                styles.status,
                { backgroundColor: item.connected ? "#74b9a9" : "#6a74c9" },
              ]}
            >
              {item.connected ? "Connected" : "Disconnected"}
            </Text>
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