import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Link, router } from "expo-router";

import StylizedButton from "@/src/components/global/button";
import Input from "@/src/components/global/textinput";
import AreaLogo from "@/assets/images/logo.png";
import { register } from "@/src/api/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    try {
      const response = await register(name, email, password);

      console.log("REGISTER RESPONSE:", response);

      if (!response.success) {
        Alert.alert("Registration failed", response.error || "Try again.");
        return;
      }

      router.replace("/(tabs)/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      Alert.alert("Error", "Could not connect to server.");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={AreaLogo} style={styles.logo} />

      <Text style={styles.title}>Create an Account</Text>

      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <StylizedButton
        style={styles.registerButton}
        label="Register"
        onPress={handleRegister}
      />

      <Text style={{ marginTop: 12 }}>Already have an account?</Text>
      <Link href={"/login"} style={{ color: "blue" }}>
        Log in here.
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 12,
    width: "70%",
  },
});
