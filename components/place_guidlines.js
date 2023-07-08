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
import { query, where, getDocs, deleteDoc, copyDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { useState, useEffect, useContext } from "react";

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function PlaceGuidlines({ navigation }) {
  const {
    userId,
    setUserId,
    places,
    setplaces,
    selectedplace,
    setselectedplace,
    cartedplaces,
    setcartedplaces,
    bookedplaces,
    setbookedplaces,
    placetype,
    setplacetype,
    cartitems,
    setcart_items,
  } = useContext(TouraContext);

  const [details, setdetails] = useState([]);
  // let i = details.length;
  // console.log("i", i);
 
   
  // async function getdetails() {
    
  //   let sentences = "";

  //   for (let j = 0; j < i; j++) {
  //     sentences += details[j] + "\n";
  //   }
  //   setdetails(sentences);
  
  //  }
  
    
 
  useEffect(() => {
    loadFonts();
  
    const q = query(
      collection(db, "guidlines"),
    );
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().type === placetype) {
          setdetails(doc.data().details);
        }
      });
    })
  
   
   
  })

 
  
  
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
      <Pressable
        color="black"
        style={{ position: "absolute", top: 40, left: 10, opacity: 0.9 }}
        onPress={() => navigation.navigate("Search")}
      >
        <Ionicons name="arrow-back-circle-outline" size={44} color="#01877E" />
      </Pressable>
      <ScrollView style={{ marginTop: 90 }}>
        <View>
       
          <Text style={styles.heading_style}>{placetype} Guidlines</Text>
          <Text style={styles.norm_text}>{details[0]}</Text>
          <Text style={styles.norm_text}>{details[1]}</Text>
          <Text style={styles.norm_text}>{details[2]}</Text>
          <Text style={styles.norm_text}>{details[3]}</Text>
          <Text style={styles.norm_text}>{details[4]}</Text>
          <Text style={styles.norm_text}>{details[5]}</Text>
          <Text style={styles.norm_text}>{details[6]}</Text>
          <Text style={styles.norm_text}>{details[7]}</Text>
          <Text style={styles.norm_text}>{details[8]}</Text>
          <Text style={styles.norm_text}>{details[9]}</Text>
          <Text style={styles.norm_text}>{details[10]}</Text>
          <Text style={styles.norm_text}>{details[11]}</Text>
          <Text style={styles.norm_text}>{details[12]}</Text>
          <Text style={styles.norm_text}>{details[13]}</Text>
         
        </View>

       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading_style: {
    fontSize: 25,
    // fontWeight: "bold",
    color: "#13313D",
    fontFamily: "Podkova",
    // textAlign: "center",
    justifyContent: "center",
    marginTop: 7,
    marginRight: 10,
    marginLeft: 15,
    // fontFamily: "sans-serif-condensed",
    // textShadowColor: "black",
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 1,
  },

  norm_text: {
    color: "#01877E",
    fontSize: 17,
    // fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    fontFamily: "Podkova",
  },

  button_style: {
    padding: 10,
    paddingBottom: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "#01877E",
    borderColor: "transparent",
    borderBottomColor: "#01877E",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  button_text: {
    fontSize: 17,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    color: "#01877E",
  },
  customer_container: {
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  footer_style: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#13313D",
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: "#01877E",
    height: 60,
  },
  footer_text: {
    color: "white",
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    marginLeft: 10,
  },
  footer_button: {
    backgroundColor: "#13313D",
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    borderColor: "white",
    borderWidth: 1,
  },
});
