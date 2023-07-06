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




export default function SearchPage({ navigation }) {
  let [tosearch, onchangetosearch] = useState("");
  const { userId, setUserId, places, setplaces } = useContext(TouraContext);
  loadFonts();

  
  function search_next_button() {
    // console.log("search next button pressed");
    // //  onchangetosearch(tosearch.toLowerCase().trim());
    // tosearch = tosearch.toLowerCase().trim();
    // onchangetosearch(tosearch);

    // console.log("matchplace function called");
    // console.log(tosearch);

    // const q = query(
    //   collection(db, "place"),

    //   where("place_name", "==", tosearch)
    // );
    // const querySnapshot = getDocs(q);
    // querySnapshot.then((doc) => {
    //   if (doc.empty) {
    //     console.log("No such document!");
    //   } else {
    //     doc.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data().place_name);
    //       places.push(doc.data());
    //     });
    //   }
    // });
    // setplaces([]);
    // setplaces(places);
    // // console.log(places);
    // // console.log("places pasted");

    // navigation.navigate("Activities");


       console.log("search next button pressed");
    //  onchangetosearch(tosearch.toLowerCase().trim());
    tosearch = tosearch.toLowerCase().trim();
    onchangetosearch(tosearch);
    const q = query(collection(db, "place"), where("place_name", "==", tosearch));
  const querySnapshot = getDocs(q);
  querySnapshot.then((doc) => {
    if (doc.empty) {
      console.log("No such document!");
    } else {
      const newPlaces = [];
      doc.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().place_name);
        newPlaces.push(doc.data());
      });
      setplaces(newPlaces);
      navigation.navigate("Activities");
    }
  });
 
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.text_style2}>Where do you want to go?</Text>
        </View>
        <View style={styles.search_style}>
          <TextInput
            value={tosearch}
            placeholder="Search Place"
            onChangeText={(tosearch) => {
              onchangetosearch(tosearch);
            }}
            style={styles.input_style}
            placeholderTextColor="#Ebe8"
            clearButtonMode="always"
          ></TextInput>

          <Pressable onPress={search_next_button}>
            <Ionicons name="search" size={25} color="#01877E" />
          </Pressable>
        </View>
        <View>
          <Text style={styles.text_style2}>Recommended Places</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.small_containers}>
            <ImageBackground
              source={require("../assets/topsearch_1.jpeg")}
              style={styles.image_style}
            >
              <Ionicons
                name="heart"
                size={25}
                color="white"
                style={styles.heart_icon_style}
              />
              <Text style={styles.norm_text}>Fairy Meadows</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground
              source={require("../assets/topsearch_2.jpeg")}
              style={styles.image_style}
            >
              <Ionicons
                name="heart"
                size={25}
                color="white"
                style={styles.heart_icon_style}
              />
              <Text style={styles.norm_text}>Mushk Pori Top</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground
              source={require("../assets/land_page_toura.jpeg")}
              style={styles.image_style}
            >
              <Ionicons
                name="heart"
                size={25}
                color="white"
                style={styles.heart_icon_style}
              />
              <Text style={styles.norm_text}>Hunza Valley</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground
              source={require("../assets/topsearch_1.jpeg")}
              style={styles.image_style}
            >
              <Ionicons
                name="heart"
                size={25}
                color="white"
                style={styles.heart_icon_style}
              />
              <Text style={styles.norm_text}>Fairy Meadows</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground
              source={require("../assets/topsearch_2.jpeg")}
              style={styles.image_style}
            >
              <Ionicons
                name="heart"
                size={25}
                color="white"
                style={styles.heart_icon_style}
              />
              <Text style={styles.norm_text}>Mushk Pori Top</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground
              source={require("../assets/land_page_toura.jpeg")}
              style={styles.image_style}
            >
              <Ionicons
                name="heart"
                size={25}
                color="white"
                style={styles.heart_icon_style}
              />
              <Text style={styles.norm_text}>Hunza Valley</Text>
            </ImageBackground>
          </View>
        </ScrollView>
        <View>
          <Text style={styles.text_style2}>Hiking Guidlines</Text>
        </View>
        <View style={styles.button_container}>
          <Pressable style={styles.button_style}>
            <View style={styles.small_containers}>
              <ImageBackground
                source={require("../assets/hiking_guide_toura.jpeg")}
                style={styles.image_style}
              >
                <Text style={styles.norm_text2}>
                  Important Things You Need To Know
                </Text>
              </ImageBackground>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text_style: {
    fontSize: 23,
    // fontWeight: "bold",
    color: "#01877E",
    textAlign: "center",
    justifyContent: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.7,
    paddingTop: 70,
    fontFamily: "Podkova",
  },
  text_style2: {
    fontSize: 23,
    // fontWeight: "bold",
    color: "#01877E",
    textAlign: "center",
    justifyContent: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.7,
    paddingTop: -20,
    fontFamily: "Podkova",
  },
  home_image: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
    marginTop: 30,
    marginBottom: 20,
    borderColor: "transparent",
    borderBottomColor: "#01877E",
    borderLeftColor: "#01877E",
    borderRightColor: "#01877E",
    borderWidth: 1,
  },
  small_containers: {
    marginTop: 30,
    marginBottom: 30,
    width: 220,
    height: 160,
    margin: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,
    borderRadius: 20,
  },
  image_style: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    flexDirection: "column-reverse",
    resizeMode: "contain",
    borderRadius: 20,
  },
  button_style: {
    backgroundColor: "white",
    width: "50%",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 60,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,
    marginBottom: 20,
    borderColor: "13313D",
    borderWidth: 1,
  },
  search_style: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    width: "80%",
    height: 40,
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",

    margin: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,
    marginBottom: 20,
    borderColor: "13313D",
    borderWidth: 1,
  },
  button_container: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  button_text: {
    color: "#01877E",
    fontSize: 17,
    // fontWeight: "bold",
    marginRight: 15,
    fontFamily: "Podkova",
  },
  norm_text: {
    color: "white",
    fontSize: 15,
    // fontWeight: "bold",
    margin: 10,
    fontFamily: "Podkova",
  },
  norm_text2: {
    color: "black",
    fontSize: 20,
    padding: 15,
    paddingBottom: 20,
    fontFamily: "Podkova",
  },
  input_style: {
    fontSize: 18,
    flexDirection: "row",
    fontFamily: "Podkova",
  },
  heart_icon_style: {
    position: "absolute",
    top: 10,
    right: 10,
    opacity: 0.7,
  },
});
