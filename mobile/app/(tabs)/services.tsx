import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/src/api/config";
import Input from "@/src/components/global/textinput";

import * as Linking from 'expo-linking';

const servicesData = [
  { id: "google", name: "Google", icon: require("@/assets/images/google.png") },
  { id: "github", name: "GitHub", icon: require("@/assets/images/github.png") },
  { id: "discord",name: "Discord",icon: require("@/assets/images/discord.png"),},
  { id: "twitter", name: "Twitter", icon: require("@/assets/images/TwitterLogo.png") },
  { id: "spotify", name: "Spotify", icon: require("@/assets/images/SpotifyLogo.png") },
  { id: "microsoft",name: "Microsoft",icon: require("@/assets/images/MicrosoftLogo.png"),},
];

export default function OAuthPage() {
  const [services, setServices] = useState(
    servicesData.map((s) => ({ ...s, connected: false })),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [currentURL, setCurrentURL] = useState("");
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
  }, []);

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

  }

  const handleConnect = async (serviceId: string) => {
    const redirectUri = Linking.createURL('oauth-callback'); // e.g., myapp://oauth-callback
    console.log("Redirect URI:", redirectUri);

    console.log("Connecting with url:", `${API_URL}/oauth/${serviceId}`);
    const connectURL = `${API_URL}/oauth/${serviceId}?redirect_to=${redirectUri}`;
    console.log("Final connect URL:", connectURL);

    setCurrentURL(connectURL);
    console.log("Opening WebView with URL:", connectURL);
    setModalVisible(true);
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

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>Close</Text>
            </TouchableOpacity>

            <WebView
              source={{ uri: currentURL }}
              style={{ flex: 1 }}
              sharedCookiesEnabled={true}
              onNavigationStateChange={(navState) => {
                if (navState.url.includes("/callback")) {
                  setModalVisible(false);

                  setServices((prev) =>
                    prev.map((s) =>
                      s.id === currentURL.split("/").pop()
                        ? { ...s, connected: true }
                        : s,
                    ),
                  );
                }
              }}
            />
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    height: "80%",
    overflow: "hidden",
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
  },
  searchInput: {
    borderColor: "#eff2f9",
    borderWidth: 4,
    width: 300,
    height: 45,
  },
});
