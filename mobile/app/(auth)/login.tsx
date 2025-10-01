import { Text, View , StyleSheet, Image } from "react-native";
import { Link, router } from "expo-router";
import StylizedButton from "@/src/components/global/button";
import Input from "@/src/components/global/textinput";
import OrDivider from "@/src/components/auth/login/separator";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GoogleLogo from "@/assets/images/google.png";
import AreaLogo from "@/assets/images/logo.png";

export default function Index() {
  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }
  
      // ✅ Save token (assuming backend returns it in JSON, not cookie)
      // If you kept cookies, you'll need a library like react-native-cookies
      // But JSON token is much easier in mobile
      await AsyncStorage.setItem("token", data.token);
  
      // Navigate to home
      router.replace("/home");
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  }
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={AreaLogo}
        style={styles.logo}
      />
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

      <StylizedButton style={styles.loginbutton}
        label="Login"
        onPress={() => handleLogin()}
      />
      <OrDivider />
      <StylizedButton style={styles.googleButton}
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
      <Text>Don't have an account?</Text>
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
    width: '70%',
  },
  googleButtonLabel: {
    color: "#000000",
  },
  loginbutton: {
    marginTop: 10,
    marginBottom: 10,
    width: '70%',
  },
  input: {
    marginBottom: 10,
    width: '80%',
  },
  logo: {
    width: '80%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
});