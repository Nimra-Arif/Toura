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
  SafeAreaView,
  Modal,
  ViewPropsAndroid,
} from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
import { ScrollView } from "react-native";

import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { query, where, getDocs, deleteDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { useState, useEffect,useContext } from "react";


async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function Profile({ navigation }) {
  
const [username,setusername]=useState("");
  const { userId, setUserId,places,setplaces }= useContext(TouraContext);
 
  const q= query(collection(db, "users"),where("uid","==",userId));
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    let  profileName=doc.data().username;
      setusername(profileName);
      console.log(username);
    });
  })

useEffect(() => {
  loadFonts();
  console.log("Profile page");
  console.log(userId);
 

}, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#01877E",
          height: 35,
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 1,
        }}
      ></View>
      <View style={styles.header_style}>
        <Text style={styles.header_text} numberOfLines={2}>
          Profile
        </Text>
      </View>
      <View style={styles.large_container}>
        <ImageBackground
          source={require("../assets/profile_pic.png")}
          style={styles.background_image_style}
        >
          <View style={styles.inner_container}>
            <View style={styles.inner_container1}>
              <Text style={styles.header_text1}>
              
                {/* {userId} */}

              {username}
              </Text>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="person" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Edit Profile</Text>
              </Pressable>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="wallet" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Currency</Text>
                <Ionicons name="caret-down" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="wallet" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Notifications</Text>
                <Ionicons name="toggle" size={29} color="white" />
              </Pressable>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="chatbox-ellipses" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Leave feedback</Text>
              </Pressable>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="book" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Privacy Policy </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_style: {
    flex: 0.2,
    borderColor: "#13313D",
    borderWidth: 2,
    borderRadius: 1,
    backgroundColor: "#01877E",
    height: 55,
    position: "absolute",
    // top: 0,
    marginTop: 35,
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  header_text: {
    color: "white",
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    marginLeft: 10,
  },
  header_text1: {
    color: "white",
    fontSize: 33,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    marginLeft: 10,
  },
  large_container: {
    flex: 1,
    marginTop: 90,
    backgroundColor: "#01877E",
    opacity: 0.8,
  },
  background_image_style: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  inner_container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  inner_container1: {
    justifyContent: "center",
    alignItems: "center",
    margin: 60,
  },
  inner_container2: {
    width: "60%",
    height: 34,
    // justifyContent: "center",
    borderColor: "transparent",
    borderBottomColor: "white",
    borderWidth: 1,
    marginTop: 20,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  text_style: {
    color: "white",
    fontSize: 22,
    // fontWeight: "bold",
    margin: 2,
    fontFamily: "Podkova",
    // marginRight: 100,
  },

  pressable_style: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
