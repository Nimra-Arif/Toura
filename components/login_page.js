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
import { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./config.jsx";
import { query, where, getDocs, deleteDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import {
  emailVerified,
  currentUser,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { auth } from "./config.jsx";
import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}

export default function Login({ navigation }) {
  const {
    userId,
    setUserId,
    setcartedplaces,
    setbookedplaces,
    Wishlistplace,
    setWishlistplace,
  } = useContext(TouraContext);

  let [email, onchangeemail] = useState("");
  const [password, onchangepassword] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  let [iconName, seticonName] = useState("eye");

  async function handleResetPassword() {
    email = email.trim();
    if (email === "") {
      alert("Please enter your email address");
      return;
    }

    try {
      // Step 1: Send password reset email
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your email inbox.");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(
        "An error occurred while resetting the password. Please try again later."
      );
    }
  }

  useEffect(() => {
    onchangeemail("");
    onchangepassword("");
  }, []);

  loadFonts();

  function settingData(id) {
    const q = query(collection(db, "users"), where("uid", "==", id));
    const querySnapshot = getDocs(q);
    querySnapshot.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setWishlistplace(doc.data().wishlist);
        setcartedplaces(doc.data().cartlist);
        setbookedplaces(doc.data().bookedlist);
        console.log("length here");
        console.log(Wishlistplace.length);
        console.log(doc.data().wishlist.length);
      });
    });
  }

  function loginuser() {
    if (email === "" || password === "") {
      alert("Please enter all the fields");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (user.emailVerified) {
            setUserId(user.uid);
            console.log("User logged in successfully");

            console.log(user.uid);
            settingData(user.uid);
            navigation.navigate("MainPage");
          } else {
            alert("Please verify your email before logging in.");
          }
        })
        .catch((error) => {
          if (
            error.code === "auth/invalid-email" ||
            error.code === "auth/user-not-found"
          ) {
            alert("Invalid email or password");
          } else if (error.code === "auth/wrong-password") {
            alert("Invalid password");
          } else {
            console.error("Error signing in:", error);
            alert(
              "An error occurred while signing in. Please try again later."
            );
          }
        });
    }
  }

  async function showPassword() {
    if (iconName === "eye-off") {
      seticonName("eye");
      setsecureTextEntry(true);
    } else {
      seticonName("eye-off");
      setsecureTextEntry(false);
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
            <TouchableOpacity
              style={styles.normal_text}
              onPress={() => handleResetPassword()}
            >
              <Text style={{ color: "white" }}>Forgot Password?</Text>
            </TouchableOpacity>
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
    // padding: 10,
    fontSize: 18,
    borderColor: "transparent",
    borderBottomColor: "white",
    marginTop: 13,
    fontFamily: "Podkova",
  },
  text_style: {
    color: "white",
    fontSize: 35,
    fontFamily: "Podkova",
    paddingLeft: "6%",
  },
  normal_text: {
    color: "white",
    fontSize: 15,
    paddingTop: "2%",
    fontFamily: "Podkova",
  },
  icon_style: {
    paddingLeft: "80%",
    paddingBottom: "10%",
    paddingRight: "10%",
  },
  previous_icon_style: {
    paddingLeft: 10,
    paddingTop: "10%",
  },
  input_style1: {
    height: 40,
    width: "70%",
    color: "white",
    borderWidth: 1,
    fontSize: 18,
    borderColor: "transparent",
    fontFamily: "Podkova",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Pressable_container: {
    height: 40,
    width: "70%",
    color: "white",
    borderWidth: 1,
    fontSize: 22,
    borderColor: "transparent",
    borderBottomColor: "white",
    marginTop: 13,
    fontFamily: "Podkova",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
