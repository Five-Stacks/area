import { Text, View, Image, StyleSheet } from "react-native";
import { globalColors } from "@/src/styles/global";
import Input from "@/src/components/global/textinput";
import StylizedButton from "@/src/components/global/button";
import { useState, useEffect } from "react";
import { router } from "expo-router";


import { updateUser, getUser, logout } from "@/src/api/auth";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser();
        if (userData.success) {
          setName(userData.user.name || "");
          setEmail(userData.user.email || "");
          console.log("Fetched user data:", userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      logout();
      setTimeout(() => router.replace("/"), 1000);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout. Try again.");
    }
  }

  async function handleUpdate() {
    try {
      if (!name || !email) {
        alert("Please fill in all fields.");
        return;
      }

      const my_id = await getUser().then((res) => res.user.id);
      console.log("MY ID:", my_id);

      const response = await updateUser(my_id, name, email, password);
      console.log("UPDATE RESPONSE:", response);

      if (!response.success) {
        alert("Update failed.");
        return;
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: "5%",
    marginBottom: "10%",
    borderRadius: 75,
    backgroundColor: globalColors.background,

    // iOS shadow
    shadowColor: globalColors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Android shadow
    elevation: 10,
  },
  imageProfile: {
    width: 150,
    height: 150,
  },
  buttonContainer: {
    width: "100%",
    height: "20%",
    position: "absolute",
    bottom: 35,
  },
  button: {
    marginTop: "5%",
    alignSelf: 'center',
    width: "70%",
  },
  buttonLogout: {
    backgroundColor: "#CC0000",
    marginTop: "5%",
    alignSelf: 'center',
    width: "70%",
  },
  warning: {
    color: "red",
    fontSize: 10,
  }
});
