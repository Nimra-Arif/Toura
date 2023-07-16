import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const BGcolor="#00A693";
// import { loadFonts } from "../App";

async function loadFonts() {
   Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}


const LaunchScreen = ({ navigation }) => {
  
  
  useEffect(() => {
    async function loadData() {
      await loadFonts();
    }
  
    loadData();
  
    setTimeout(() => {
      navigation.navigate("Starting Page");
    }, 3000);
  }, []);
  

  return (
    <View style={{ backgroundColor: "#00A693", flex: 1 }}>
      <Animatable.View
        animation="bounceIn"
        iterationCount={1}
        duration={1000}
        delay={400}
        style={styles.container}
      >
        <Animatable.Image
          source={require("../assets/logo_toura.png")}
          style={styles.image_style}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A693",
    alignItems: "center",
  },
  text_style: {
    fontSize: 45,
    // fontWeight: "bold",
    color: "white",
    marginTop: -60,
    // fontFamily: "Podkova",
  },
  slogan_style: {
    color: "white",
    fontSize: 15,
    // fontFamily: "Playball",
  },
  image_style: {
    width: 270,
    height: 230,
    marginTop: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginLeft: 10,
  },
});

export default LaunchScreen;
