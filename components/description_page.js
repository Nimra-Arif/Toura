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
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { query, where, getDocs, deleteDoc, copyDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
import { ScrollView } from "react-native";
import SearchPage from "./search_page";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function Description({ navigation }) {
  const {
    userId,
    setUserId,
    places,
    setplaces,
    selectedplace,
    setselectedplace,
    cartedplaces,
    setcartedplaces,
  } = useContext(TouraContext);
  loadFonts();
  let numofdays = selectedplace.duration;
//  const [details,setdetails]=useState("");
    let details = "";
  //  let numofdays=selectedplace.duration;
 
 async function getdetails() {
   
   
    for (let i = 1; i <= numofdays; i++) {
        details += "Day"+ [i]+ "\n\n"+selectedplace.full_description[i] + "\n\n";
        // setdetails(details+selectedplace.full_description[i]+"\n");
    }

 }
   getdetails();
   function book_place() {
    console.log("booked");

    cartedplaces.push(selectedplace);
    setcartedplaces(cartedplaces);
    // console.log(cartedplaces);
   navigation.navigate("Cart");
   
  }


   
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
  onPress={() => navigation.navigate("SecondPage")}
>
  <Ionicons name="arrow-back-circle-outline" size={44} color="#01877E" />
</Pressable>


<ScrollView style={{ marginTop: 90 }}>
  <View>
    <Text style={styles.heading_style}>Highlights</Text>
    <Text style={styles.norm_text}>{selectedplace.highlights}</Text>
  </View>
  <View>
    <Text style={styles.heading_style}>Full Description</Text>
  <Text  style={styles.norm_text}>  {selectedplace.full_description[0]}</Text>
    <Text style={styles.norm_text}>{details}</Text>
  </View>
  <View>
    <Text style={styles.heading_style}>Cancellation Policy</Text>
    <Text style={styles.norm_text}>Cancel up yo 24 hours in advance for a full refund</Text>
  </View>
  <View>
    <Text style={styles.heading_style}>Includes</Text>
    <Text style={styles.norm_text}>{selectedplace.includes}</Text>
  </View>
  <View>
    <Text style={styles.heading_style}>Not suitable for</Text>
    <Text style={styles.norm_text}>{selectedplace.not_suitable_for}</Text>
  </View>
 
  <View>
    <Text style={styles.heading_style}>Know before you go</Text>
    <Text style={styles.norm_text}>{selectedplace.know_before_you_go[0]}</Text>
      <Text style={styles.norm_text}>{selectedplace.know_before_you_go[1]}</Text>
       <Text style={styles.norm_text}>{selectedplace.know_before_you_go}{"\n"}</Text> 
  </View>
  <View>
    <Text style={styles.heading_style}>What to bring</Text>
  
    <Text style={styles.norm_text}>{selectedplace.what_to_bring[0]}</Text>
    <Text style={styles.norm_text}>{selectedplace.what_to_bring[1]}</Text>
    <Text style={styles.norm_text}>{selectedplace.what_to_bring[2]}</Text>
    <Text style={styles.norm_text}>{selectedplace.what_to_bring[3]}</Text>
    <Text style={styles.norm_text}>{selectedplace.what_to_bring[4]}</Text>
    <Text style={styles.norm_text}>{selectedplace.what_to_bring[5]}</Text>




    


  </View>
</ScrollView>
<View style={styles.footer_style}>
  <Text style={styles.footer_text} numberOfLines={2}>
    From {"\n"}
    Rs. {selectedplace.price} per person
  </Text>
  <Pressable style={styles.footer_button}onPress={book_place}>
    <Text style={styles.footer_text}>Book Now</Text>
  </Pressable>
</View>
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
    fontSize: 15,
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
