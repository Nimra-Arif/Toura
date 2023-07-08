import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login_page.js";
import SignUp1 from "./signup_page1.js";
import * as Animatable from "react-native-animatable";
import TypeWriter from "@sucho/react-native-typewriter";

async function loadFonts() {
  Font.loadAsync({
   'Podkova': require("../assets/fonts/Podkova.ttf"),
   "Playball": require("../assets/fonts/Playball.ttf"),
   // Add other custom fonts here if needed
 });
}

export default function StarterPage({ navigation }) {
 
 loadFonts();
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.name_style}>TOURA</Text>

        <Image
          source={require("../assets/MyProj.png")}
          style={styles.image_style}
        />
        <View style={{ paddingLeft:25}}>
        <TypeWriter
          textArray={["Embrace the Journey, Embrace the World "]}
          loop={false}

          speed={100}
          delay={90}
          
          
          
          textStyle={styles.slogan_style}
          cursorStyle={styles.slogan_style}
        />
        </View>
      </View>

      <View style={styles.container2}>
      <View style={styles.small_container}
      >
        <Text style={styles.normal_text}> New to Toura? </Text>

        <Pressable
          style={{
            borderBottomColor: "#fff",
            borderBottomWidth: 1,
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate("SignUp1")}
        >
          <Text style={styles.bold_text}>Sign Up</Text>
        </Pressable>
        </View>
        <View style={styles.small_container}>
          <Text style={styles.normal_text}> Already Have An Account? </Text>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ borderBottomColor: "#fff", borderBottomWidth: 1 }}
          >
            <Text style={styles.bold_text}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A693",
    alignItems: "center",
    flexDirection: "column",
  },
  container1: {
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 100,
  },
  container2: {
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 310,
  },
  name_style: {
    color: "#fff",
    fontSize: 45,

    fontFamily: "Podkova",
    textShadowColor: "#899499",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  slogan_style: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Playball",
  },
  image_style: {
    width: 130,
    height: 150,
    resizeMode: "contain",
  },
  small_container: {
    flexDirection: "row",
  },
  bold_text: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Podkova",
    // fontWeight: "bold",
    alignSelf: "center",

    borderBottomColor: "#fff",
  },
  normal_text: {
    color: "#fff",
    fontSize: 18 ,
    fontFamily: "Podkova",
    paddingTop: 3,
  },
});
