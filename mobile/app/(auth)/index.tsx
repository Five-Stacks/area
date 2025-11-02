import { Text, View, Image, StyleSheet, ImageBackground } from "react-native";
import { router } from "expo-router";
import StylizedButton from "@/src/components/global/button";
import { useEffect } from "react";
import { isConnected } from "@/src/api/auth";

export default function Index() {
  return (
    <View
      style={styles.view}>
      <ImageBackground
        source={require("@/assets/images/BgPoints.png")}
        style={styles.backgroundContainer}
        imageStyle={styles.backgroundImage}
      />
      <Image
        source={require("@/assets/images/LogoVertical.png")}
        style={styles.image}
      />
      <Text style={styles.title1} >Automation for</Text>
      <Text style={styles.title2} >business and home</Text>
      <Text style={styles.text}>Save time and get more done</Text>
      <View
        style={styles.buttonContainer}
      >
        <StylizedButton 
          label="START TODAY"
          onPress={() => router.push("/login")}
          style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backgroundContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  backgroundImage: {
    resizeMode: 'repeat',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 100,
    marginBottom: 80,
  },
  title1: {
    fontWeight: "bold",
    fontSize: 35,
    paddingTop: 10,
  },
  title2: {
    fontWeight: "bold",
    fontSize: 35,
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    height: "20%",
    position: "absolute",
    bottom: 0,
  },
  button: {
    alignSelf: 'center',
  }
});
