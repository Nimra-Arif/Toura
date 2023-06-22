import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";

export default function Home({ navigation }) {
 
  return (
    <View style={styles.container}>
     <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  big_container: {
    paddingTop: "60%",
    flexDirection: "column",
  },
  container1: {
    paddingLeft: "3%",
    justifyContent: "center",
    paddingTop: "28%",
  },
  container2: {
    paddingTop: "-10%",

    justifyContent: "center",
    width: "100%",
    height: "50%",
    paddingLeft: "6%",
  },
  image_style: {
    borderRadius: 50,
    resizeMode: "contain",
    backgroundColor: "white",
  },
  input_style: {
    height: 40,
    width: "70%",
    color: "white",
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "transparent",
    borderBottomColor: "white",
    marginTop: 13,
  },
  text_style1: {
    color: "white",
    fontSize: 25,
    paddingTop: "6%",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  text_style2: {
    color: "white",
    fontSize: 21,
    paddingTop: "15%",

    fontStyle: "italic",
    textAlign: "center",
  },
  normal_text: {
    color: "white",
    fontSize: 15,
    fontFamily: "Roboto",
    fontStyle: "italic",
    paddingLeft: "33%",
    paddingTop: "2%",
  },
  normal_text2: {
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto",
    fontStyle: "italic",
   paddingRight:"5%",
    paddingTop: "6%",
  },
  icon_style: {
    paddingTop: "10%",
    paddingLeft: "50%",
flexDirection:"row",
    paddingRight: "5%",
  },
  previous_icon_style: {
    position: "absolute",
    paddingTop: "80%",
    paddingLeft: 10,
  },
  upload_picture_style: {
    paddingTop: "5%",
    paddingLeft: "40%",
    paddingRight: "5%",
  },
});