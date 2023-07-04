 import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./config.jsx";
import { query, where, getDocs, deleteDoc } from "firebase/firestore";
export let exportedId = "";

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}

export default function Login({ navigation }) {
  const [email, onchangeemail] = useState("");
  const [password, onchangepassword] = useState("");
  useEffect(() => {
    onchangeemail("");
    onchangepassword("");
  }, []);

  loadFonts();

  function loginuser() {
    if (email === "" || password === "") {
      alert("Please enter all the fields");
    } else {
      const q = query(collection(db, "users"), where("email", "==", email));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().password === password) {
            exportedId = doc;
            console.log(exportedId.data().username);
            console.log(doc.id);
            navigation.navigate("MainPage");
          } else {
            alert("Invalid email or password");
          }
        });
      });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : { height: 10 }}
      style={styles.container}
    >
      <ImageBackground
        style={{ flex: 1, resizeMode: "contain" }}
        source={require("../assets/back_men.png")}
      >
        <View style={styles.big_container}>
          <View style={styles.previous_icon_style}>
            <Pressable
              color="#01877E"
              onPress={() => navigation.navigate("Starting Page")}
            >
              <Ionicons name="arrow-back-circle" size={47} color="#01877E" />
            </Pressable>
          </View>

          <View style={styles.container1}>
            <Text style={styles.text_style}>Login</Text>
          </View>

          <View style={styles.container2}>
            <TextInput
              value={email}
              placeholder="Email"
              onChangeText={(email) => {
                onchangeemail(email);
              }}
              style={styles.input_style}
              placeholderTextColor="#Ebe8"
              clearButtonMode="always"
            ></TextInput>
            <TextInput
              value={password}
              placeholder="Password"
              onChangeText={(password) => {
                onchangepassword(password);
              }}
              style={styles.input_style}
              placeholderTextColor="#Ebe8"
              clearButtonMode="always"
              secureTextEntry={true}
            ></TextInput>
            <Text style={styles.normal_text}>Forgot Password?</Text>
          </View>

          <View style={styles.icon_style}>
            <Pressable onPress={loginuser}>
              <Ionicons name="arrow-forward-circle" size={40} color="white" />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  big_container: {
    // paddingTop: "60%",
    // flexDirection: "column",
    flex: 1,
  },
  container1: {
    flex: 1,
    paddingLeft: "1%",
    justifyContent: "center",
    paddingTop: 60,
  },
  container2: {
    flex: 0.3,
    paddingTop: 20,
    justifyContent: "center",
    width: "100%",
    height: "50%",
    paddingLeft: "10%",
    paddingBottom: 100,
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
  text_style: {
    color: "white",
    fontSize: 35,

    // fontWeight: "bold",
    // fontStyle: "italic",
    fontFamily: "Podkova",
    paddingLeft: "6%",
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
  icon_style: {
    // paddingTop: "10%",
    paddingLeft: "80%",
    paddingBottom: "10%",
    paddingRight: "10%",
  },
  previous_icon_style: {
    // position: "absolute",

    paddingLeft: 10,
    paddingTop: "10%",
  },
});
