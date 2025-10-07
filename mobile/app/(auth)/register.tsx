import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import StylizedButton from "@/src/components/global/button";
import Input from "@/src/components/global/textinput";
import AreaLogo from "@/assets/images/logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Optional: if user already logged in, redirect them
  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) router.replace("/home");
    }
    checkToken();
  }, []);

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }
  
    try {
      const response = await fetch("http://10.84.107.195:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response from server");
      }
  
      console.log("REGISTER RESPONSE:", data);
  
      if (!response.ok) {
        Alert.alert("Registration failed", data.error || "Try again.");
        return;
      }
  
      if (data.token) {
        router.replace("/home");
      } else {
        router.replace("/home");
      }
  
    } catch (err) {
      console.error("Register error:", err);
      Alert.alert("Error", "Could not connect to server.");
    }
  }
  

  return (
    <View style={styles.container}>
      <Image source={AreaLogo} style={styles.logo} />

      <Text style={styles.title}>Create an Account</Text>

      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
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






//import { Text, View } from "react-native";
//import { Link } from "expo-router";
//
//export default function Index() {
//  return (
//    <View
//      style={{
//        flex: 1,
//        justifyContent: "center",
//        alignItems: "center",
//      }}
//    >
//      <Text>Register screen</Text>
//      <Link href={"/login"} style={{ color: "blue" }}>
//        GOTO Login
//      </Link>
//    </View>
//  );
//}
//