import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
  Platform,
  Image,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./config.jsx";
import { auth } from "./config.jsx";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}

export default function SignUp1({ navigation }) {
  const [username, onchangeusername] = useState("");
  const [email, onchangeemail] = useState("");
  const [password, onchangepassword] = useState("");
  const [gender, onchangegender] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);


  let [iconName, seticonName] = useState("eye");
  

  loadFonts();
  async function createuser() {
    if (email === "" || password === "" || username === "" || gender === "") {
      alert("Please enter all the fields");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        addDoc(collection(db, "users"), {
          username: username,
          email: email,
          password: password,
          gender: gender,
          uid: user.uid,
        });
        console.log("User created successfully!");

        // Send verification email to the user
        await sendEmailVerification(user)
          .then(() => {
            console.log("Verification email sent successfully.");
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
          });
        alert("Verify your email to login");

        onchangeemail("");
        onchangeusername("");
        onchangepassword("");
        onchangegender("");
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error creating user ", error);
      }
    }
  }
  async function showPassword() {
    if (iconName === "eye") {
      seticonName("eye-off");
      setsecureTextEntry(true);
    } else {
      seticonName("eye");
      setsecureTextEntry(false);
    }
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : { height: 100 }}
    >
      <ImageBackground
        style={{ flex: 1, resizeMode: "contain" }}
        source={require("../assets/back_men.png")}
      >
        <View style={styles.big_container}>
          <Pressable
            color="#01877E"
            onPress={() => navigation.navigate("Starting Page")}
            style={styles.previous_icon_style}
          >
            <Ionicons name="arrow-back-circle" size={47} color="#01877E" />
          </Pressable>

          <View style={styles.container1}>
            <Text style={styles.text_style} numberOfLines={2}>
              Create Account
            </Text>
          </View>

          <View style={styles.container2}>
            <TextInput
              value={username}
              placeholder="Username"
              onChangeText={(username) => {
                onchangeusername(username);
              }}
              style={styles.input_style}
              placeholderTextColor="#Ebe8"
              clearButtonMode="always"
            ></TextInput>
            <TextInput
              value={email}
              placeholder="Email"
              onChangeText={(email) => {
                onchangeemail(email);
              }}
              style={styles.input_style}
              placeholderTextColor="#Ebe8"
              keyboardType="email-address"
              clearButtonMode="always"
            ></TextInput>
            <View style={styles.Pressable_container}>
              <TextInput
                value={password}
                placeholder="Password"
                onChangeText={(password) => {
                  onchangepassword(password);
                }}
                style={styles.input_style1}
                placeholderTextColor="#Ebe8"
                secureTextEntry={secureTextEntry}
                clearButtonMode="always"
              ></TextInput>
              <Pressable onPress={showPassword}>
                <Ionicons
                  name={iconName}
                  size={23}
                  color="#ebe8"
                  margin={9}
                  marginRight={25}
                />
              </Pressable>
            </View>
            {/* <TextInput
              value={gender}
              placeholder="Gender"
              onChangeText={(gender) => {
                onchangegender(gender);
              }}
              style={styles.input_style}
              placeholderTextColor="#Ebe8"
              clearButtonMode="always"
            ></TextInput> */}
            <View style={styles.picker_outercontainer_style}>
              <View style={styles.picker_container_style}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => onchangegender(itemValue)}
                  style={styles.picker_style}
                  prompt="Select Gender"
                  promptStyle={{ color: "#Ebe8", with: "100%" }}
                  mode="dropdown"
                  dropdownIconColor="white"
                >
                  <Picker.Item
                    label="Select Gender"
                    value=""
                    style={{ color: "#13313D", fontFamily: "Podkova" }}
                  />

                  <Picker.Item
                    label="Male"
                    value="male"
                    style={{ fontFamily: "Podkova", color: "#018773" }}
                  />
                  <Picker.Item
                    label="Female"
                    value="female"
                    style={{ color: "#018773" }}
                  />
                  <Picker.Item
                    label="Rather not say"
                    value="Rather not say"
                    style={{ color: "#018773" }}
                  />
                </Picker>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.icon_container_style}>
          <Pressable style={styles.pressable_style} onPress={createuser}>
            <Text style={styles.normal_text2}>Get Started</Text>
            <Ionicons name="arrow-forward-circle" size={40} color="white" />
          </Pressable>
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
    flex: 1,
    paddingTop: "1%",
    // flexDirection: "column",
  },
  //
  container1: {
    flex: 1,
    flexDirection: "column-reverse",
    paddingLeft: "1%",
    // justifyContent: "center",
    paddingTop: 30,
  },
  container2: {
    flex: 0.8,
    paddingTop: 60,
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
    // padding: 10,
    fontSize: 18,
    borderColor: "transparent",
    borderBottomColor: "white",
    marginTop: 13,
    fontFamily: "Podkova",
  },
  input_style1: {
    height: 40,
    width: "70%",
    color: "white",
    borderWidth: 1,
    // padding: 10,
    fontSize: 18,
    borderColor: "transparent",
    // borderBottomColor: "white",
    // marginTop: 13,
    fontFamily: "Podkova",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Pressable_container: {
    height: 40,
    width: "70%",
    color: "white",
    borderWidth: 1,
    // padding: 10,
    fontSize: 22,
    borderColor: "transparent",
    borderBottomColor: "white",
    marginTop: 13,
    fontFamily: "Podkova",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker_style: {
    height: 40,
    width: "100%",
    color: "white",
    borderWidth: 1,
    marginLeft: -12,
    fontSize: 18,
    borderColor: "black",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    //  marginTop: 1,
    // marginRight: 20,
    // color: "#Ebe8",
    fontFamily: "Podkova",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker_container_style: {
    // marginTop: 13,
    height: 40,
    width: "100%",
    justifyContent: "space-between",
    // alignItems: "center",
    flexDirection: "row",
  },
  picker_outercontainer_style: {
    marginTop: 13,

    height: 40,
    width: "70%",
    justifyContent: "space-between",
    // alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  text_style: {
    color: "white",
    fontSize: 25,
    paddingTop: "6%",
    // fontWeight: "bold",
    // fontStyle: "italic",
    fontFamily: "Podkova",
  },
  normal_text: {
    color: "white",
    fontSize: 15,
    fontFamily: "Podkova",
    // fontStyle: "italic",
    paddingLeft: "33%",
    paddingTop: "2%",
  },
  normal_text2: {
    color: "white",
    fontSize: 20,
    fontFamily: "Podkova",

    paddingRight: "5%",
    paddingTop: "4%",
  },
  icon_container_style: {
    paddingTop: 55,
    paddingLeft: "50%",
    flexDirection: "row",
    paddingRight: "5%",
    paddingBottom: "5%",
  },
  previous_icon_style: {
    // position: "absolute",

    paddingLeft: 10,
    paddingTop: 50,
  },
  button_style: {
    width: 300,
    height: 100,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
  },
  pressable_style: {
    flexDirection: "row",
  },
  placeholder_style: {
    fontFamily: "Podkova",
    color: "#Ebe8",
  },
});
