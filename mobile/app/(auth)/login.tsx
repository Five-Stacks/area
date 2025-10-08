import { Text, View, StyleSheet, Image } from "react-native";
import { Link, router } from "expo-router";
import StylizedButton from "@/src/components/global/button";
import Input from "@/src/components/global/textinput";
import OrDivider from "@/src/components/auth/login/separator";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GoogleLogo from "@/assets/images/google.png";
import AreaLogo from "@/assets/images/logo.png";

import { API_URL } from "@/src/api/config";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/home");
      }
    }
    checkToken();
  }, []);

  async function handleLogin() {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        alert(data.error || `Login failed (${response.status})`);
        return;
      }

      if (!data.success) {
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

      <OrDivider />

      <StylizedButton
        style={styles.googleButton}
        label="Sign in with Google"
        styleLabel={styles.googleButtonLabel}
        onPress={handleLogin}
        leftElement={
          <Image
            source={GoogleLogo}
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />
        }
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
