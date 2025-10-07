import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { API_URL } from "@/src/api/config";
import Input from "@/src/components/global/textinput";

type Service = {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
};

const initialServices: Service[] = [
  {
    id: "google",
    name: "Google",
    icon: require("@/assets/images/google.png"),
    connected: false,
  },
  {
    id: "github",
    name: "GitHub",
    icon: require("@/assets/images/github.png"),
    connected: false,
  },
  {
    id: "discord",
    name: "Discord",
    icon: require("@/assets/images/discord.png"),
    connected: false,
  },
];

export default function OAuthPage() {
  const [services, setServices] = useState<Service[]>(initialServices);

  useEffect(() => {
    async function fetchConnections() {
      try {
        const response = await fetch(`${API_URL}/api/oauth/status`);
        const data = await response.json();

        setServices((prev) =>
          prev.map((s) => ({ ...s, connected: !!data[s.id] })),
        );
      } catch (err) {
        console.error("Error fetching OAuth status:", err);
      }
    }
    fetchConnections();
  }, []);

  const handleConnect = async (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    if (service.connected) {
      alert(`Disconnecting from ${service.name}...`);
      await fetch(`${API_URL}/api/oauth/disconnect/${serviceId}`, {
        method: "POST",
      });
    } else {
      alert(`Connecting to ${service.name}...`);
      await fetch(`${API_URL}/api/oauth/connect/${serviceId}`, {
        method: "GET",
      });
    }

    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId ? { ...s, connected: !s.connected } : s,
      ),
    );
  };

  return (
    <View style={styles.container}>
    <Input
      placeholder="Search services..."
      style={styles.searchInput}
      showSearchIcon={true}
      iconColor="#d0d0d0"
    />
      <Text style={styles.title}>Services</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
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
              {item.connected ? "Connected" : "Connect"}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 15,
  },
  card: {
    width: 150,
    height: 150,
    margin: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#eff2f9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardConnected: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  status: {
    fontSize: 12,
    padding: 4,
    borderRadius: 8,
    color: "#fff",
  },
  searchInput: {
    borderColor: "#eff2f9",
    borderWidth: 4,
    width: 300,
    height: 45,
  },
});
