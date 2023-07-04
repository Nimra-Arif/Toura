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
          source={require("../assets/toura_land_icon2.png")}
          style={styles.image_style}
        />
        <Text style={styles.slogan_style} numberOfLines={1}>
          Embrace the Journey, Embrace the World
        </Text>
      </View>

      <View style={styles.container2}>
        <Pressable 
        style={{borderBottomColor:"#fff",borderBottomWidth:1,marginBottom  : 10}}
        onPress={() => navigation.navigate("SignUp1")}>
          <Text style={styles.bold_text}>Create Account</Text>
        </Pressable>
        <View style={styles.small_container}>
          <Text style={styles.normal_text}> Already Have An Account</Text>
        
         <Pressable onPress={() => navigation.navigate("Login")}
            style={{borderBottomColor:"#fff",borderBottomWidth:1,}}
          >
            <Text style={styles.bold_text}> Login</Text>
          </Pressable>
        
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01877E",
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
    // fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  slogan_style: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Playball",
    textShadowColor: "black",
    textShadowOffset: { width: 4, height: 2 },
    textShadowRadius: 10,
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
    fontSize: 15,
    fontFamily: "Podkova",
    paddingTop: 3,
  },
});
