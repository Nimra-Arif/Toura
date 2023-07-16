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
  FlatList,
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
import { TouchableOpacity } from "react-native-gesture-handler";



const DATA = [
  { id: "hunza", name: "Hunza" },
  { id: "fairy meadows", name: "Fairy Meadows" },
  { id: "mushkporitop", name: "Mushk Pori Top" },
  { id: "shogran", name: "Shogran" },
  { id: "naltar", name: "Naltar" },
  { id: "gilgit", name: "Gilgit" },
  { id: "khunjerab", name: "Khunjerab" },
  { id: "k2", name: "K2" },
  { id: "nanga", name: "Nanga Parbat" },
  { id: "deosai", name: "Deosai" },
  { id: "shandur", name: "Shandur" },
  { id: "shangrila", name: "Shangrila" },
];

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}





export default function SearchPage({ navigation }) {

  const [isSearchButtonPressed, setIsSearchButtonPressed] = useState(false);

  useEffect(() => {
    loadFonts();
    if (isSearchButtonPressed) {
      const searchAndNavigate = async () => {
        const q = query(
          collection(db, "place"),
          where("place_name", "==", tosearch)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No such document!");
        } else {
          const newPlaces = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().place_name);
            newPlaces.push(doc.data());
          });
          setplaces(newPlaces);
          navigation.navigate("Activities");
        }
      };

      searchAndNavigate();
      setIsSearchButtonPressed(false);
    }
  }, [isSearchButtonPressed]);

  function search_next_button() {
    console.log("search next button pressed");
    tosearch = tosearch.toLowerCase().trim();
    console.log(tosearch);
    onchangetosearch(tosearch);
    setIsSearchButtonPressed(true);
  }

  let [tosearch, onchangetosearch] = useState("");
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

  const[isFocus,setisFocus]=useState(false);

  const [onsuggestion, setonsuggestion] = useState(false);

  function search_on_click(item) {
    console.log("search in progress");
    console.log(item);
    onchangetosearch(item);
    const q = query(
      collection(db, "place"),
      where("place_name", "==", item)
    );
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






  function search_next_button() {
    console.log("search next button pressed");
   
    tosearch = tosearch.toLowerCase().trim();
    console.log(tosearch);
    onchangetosearch(tosearch);

   
    const q = query(
      collection(db, "place"),
      where("place_name", "==", tosearch)
    );
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
        navigation.navigate("Activities");
        setplaces(newPlaces);
        
       
      }
    });
  }

  return (
    
      <SafeAreaView>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.text_style2}>Where do you want to go?</Text>
        </View>
        <View style={styles.search_style}>
          {isFocus && (
            <Pressable onPress={() => setisFocus(false)}>
              <Ionicons name="arrow-back" style={styles.back_icon_style} />
            </Pressable>
          )}

          <TextInput
            value={tosearch}
            placeholder={isFocus ? "" : "Search for a place"}
            onFocus={() => setisFocus(true)}
            onBlur={() => setisFocus(false)}

            onSubmitEditing={search_next_button}
            onChangeText={(tosearch) => {
              onchangetosearch(tosearch);
            }}
            style={[styles.input_style, {flex:1}]}
            placeholderTextColor="grey"
            clearButtonMode="always"
          ></TextInput>

          <Pressable onPress={search_next_button}>
            <Ionicons name="search" style={styles.search_icon_style} />
          </Pressable>
        </View>
      

        {isFocus && (
          
            <View style={styles.search_suggestion}>
              <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={setonsuggestion(true)}
                    
                    onPress={() => search_on_click(item.id)}
                    style={styles.searchItem}
                  >
                    <Text style={styles.searchItemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          
        )}

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
          <Text style={styles.text_style2}>{placetype} Guidlines</Text>
        </View>
        <View style={styles.button_container}>
          <Pressable
            style={styles.button_style}
            onPress={() => {
              navigation.navigate("PlaceGuidlines");
            }}
          >
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

    textAlign: "left",
  },
  heart_icon_style: {
    position: "absolute",
    top: 10,
    right: 10,
    opacity: 0.7,
  },
  search_icon_style: {
    fontSize: 25,
    color: "#01877E",
    paddingLeft: 10,
    // padding: 10,
  },
  back_icon_style: {
    fontSize: 25,
    color: "#01877E",
    paddingLeft: 0,
    paddingRight:0,
    // padding: 10,
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
  search_suggestion: {
    marginTop: 0,
    paddingHorizontal: 20,
  },
 

  searchItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#00A693",
  borderRadius:7
}
  ,
  searchItemText: {
    fontSize: 16,
    color: "#333333",
    paddingLeft:20,
    color: "white",
    fontFamily: "Podkova",
  }
  ,
});