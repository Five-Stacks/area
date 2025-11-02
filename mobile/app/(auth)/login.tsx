import { Text, View, StyleSheet, Image } from "react-native";
import { Link, router } from "expo-router";
import StylizedButton from "@/src/components/global/button";
import Input from "@/src/components/global/textinput";
import { useState, useEffect } from "react";

import AreaLogo from "@/assets/images/logo.png";

import { login } from "@/src/api/auth";


export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await login(email, password);

      if (!response.success) {
        alert("No token received from server.");
        return;
      }

      router.replace("/(tabs)/dashboard");
    } catch (error) {
      console.error("Login error:", error);
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
      <Image source={AreaLogo} style={styles.logo} />
      <Text>Log in</Text>
      <Input
        placeholder="Email"
        secureTextEntry={false}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <StylizedButton
        style={styles.loginbutton}
        label="Login"
        onPress={handleLogin}
      />
      <Text>Don&apos;t have an account?</Text>
      <Link href={"/register"} style={{ color: "blue" }}>
        Sign up here.
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    width: "70%",
  },
  googleButtonLabel: {
    color: "#000000",
  },
  loginbutton: {
    marginTop: 10,
    marginBottom: 10,
    width: "70%",
  },
  input: {
    marginBottom: 10,
    width: "80%",
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    marginBottom: 20,
  },
});
