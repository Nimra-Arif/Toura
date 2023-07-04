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
import * as Font from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
async function loadFonts() {
  Font.loadAsync({
   'Podkova': require("../assets/fonts/Podkova.ttf"),
   "Playball": require("../assets/fonts/Playball.ttf"),
   // Add other custom fonts here if needed
 });
}

export default function SignUp2({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  let iconName;
 
 
 loadFonts();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, resizeMode: "contain" }}
        source={require("../assets/back_men.png")}
      >
        <View style={styles.big_container}>
          <View style={styles.previous_icon_style}>
            <Pressable
              color="#01877E"
              onPress={() => navigation.navigate("SignUp1")}
            >
              <Ionicons name="arrow-back-circle" size={47} color="#01877E" />
            </Pressable>
          </View>

          <View style={styles.container1}>
            <Text style={styles.text_style1} numberOfLines={2}>
              Username
            </Text>
          </View>

          <View style={styles.container2}>
            <Text style={styles.text_style2}>Add A Profile Picture</Text>
            <Pressable style={styles.upload_picture_style}>
              <Ionicons
                name="cloud-upload"
                color="white"
                opacity={1}
                size={44}
              />
            </Pressable>
          </View>
          <View>
            <Pressable style={styles.icon_style}>
              <Text style={styles.normal_text2}>Get Started</Text>
              <Ionicons name="arrow-forward-circle" size={47} color="white" />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
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
    fontFamily: "Podkova",
  },
  text_style1: {
    color: "white",
    fontSize: 25,
    paddingTop: "6%",
    // fontWeight: "bold",
    // fontStyle: "italic",
    fontFamily: "Podkova",
  },
  text_style2: {
    color: "white",
    fontSize: 21,
    paddingTop: "15%",

    // fontStyle: "italic",
    fontFamily: "Podkova",
    textAlign: "center",
  },
  normal_text: {
    color: "white",
    fontSize: 15,
    // fontFamily: "Roboto",
    // fontStyle: "italic",
    paddingLeft: "33%",
    paddingTop: "2%",
    fontFamily: "Podkova",
  },
  normal_text2: {
    color: "white",
    fontSize: 20,
    // fontFamily: "Roboto",
    // fontStyle: "italic",
   paddingRight:"5%",
    paddingTop: "6%",
    fontFamily: "Podkova",
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
