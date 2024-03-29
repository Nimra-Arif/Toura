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
import { query, where, getDocs, deleteDoc, copyDoc,updateDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
import { ScrollView } from "react-native";
import SearchPage from "./search_page";

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function SecondPage2({ navigation }) {
  const    { userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces ,bookedplaces, setbookedplaces,placetype, setplacetype,
    cartitems,setcart_items,Wishlistplace,setWishlistplace,activitiesid,setactivitiesid,Recommendedplaces,setRecommendedplaces,
    topplaces,settopplaces
  } = useContext(TouraContext);
  loadFonts();

  function book_place() {
    console.log("booked");

    cartedplaces.push(selectedplace);
    setcartedplaces(cartedplaces);
    
    navigation.navigate("Cart");
  }
  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const querySnapshot = getDocs(q);
    querySnapshot.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

       doc.data().wishlist=Wishlistplace;
        doc.data().cartlist=cartedplaces;
        doc.data().bookedlist=bookedplaces;

       updateDoc(doc.ref, {wishlist:Wishlistplace})
        updateDoc(doc.ref, {cartlist:cartedplaces})
        updateDoc(doc.ref, {bookedlist:bookedplaces})
      });
    })

  },[cartedplaces])
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
      <ScrollView>
        <SafeAreaView>
          <ImageBackground
            style={styles.home_image}
            source={{uri: selectedplace.img}}
          >
            <Pressable
              color="#01877E"
              style={{ position: "absolute", top: 10, left: 10, opacity: 0.9 }}
              onPress={() => navigation.navigate("WelcomePage")}
            >
              <Ionicons name="arrow-back-circle" size={47} color="#01877E" />
            </Pressable>
          </ImageBackground>
          <View>
            <Text style={styles.heading_style}>
              From {selectedplace.departure_spot} : {selectedplace.place_name}{" "}
              {"\n"}Range {selectedplace.duration}-Days Tour
            </Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10, marginBottom: 1 }}>
            <Text style={styles.small_text}>Activity Provider:</Text>
            <Text
              style={{
                color: "red",
                fontSize: 15,
                fontFamily: "Podkova",
              }}
            >
              {selectedplace.activity_provider}
            </Text>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text style={styles.small_text}>Date:</Text>
            <Text
              style={{
                color: "red",
                fontSize: 15,
                fontFamily: "Podkova",
              }}
            >
              {selectedplace.date}
            </Text>
          </View>

          <Text style={styles.heading_style}>Description</Text>
          <Text style={styles.norm_text}>{selectedplace.description}</Text>
          <View style={{ padding: 2 }}>
            <Text style={styles.heading_style}>About this activity</Text>

            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.image_style}
                source={require("../assets/free_cancelation_icon.png")}
              />
              <Text style={styles.heading_style}>Free cancellation</Text>
            </View>
            <Text style={styles.norm_text}>
              Cancel up to 24 hours in advance for a full Refund
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.image_style}
                source={require("../assets/ticking_icon.png")}
              />
              <Text style={styles.heading_style}>Mobile Ticketing</Text>
            </View>
            <Text style={styles.norm_text}>
              Use your phone or print your voucher
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.image_style}
                source={require("../assets/duration_icon.png")}
              />
              <Text style={styles.heading_style}>Duration 7 days</Text>
            </View>
            <Text style={styles.norm_text}>
              Check availability to see starting times
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.image_style}
                source={require("../assets/guide_icon.png")}
              />
              <Text style={styles.heading_style}>Live tour guide</Text>
            </View>
            <Text style={styles.norm_text}>English</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.image_style}
                source={require("../assets/pickup_icon.png")}
              />
              <Text style={styles.heading_style}>Pickup included</Text>
            </View>
            <Text style={styles.norm_text}>
              We (our guide) will in arrivals of Islamabad International Airport
            </Text>
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Text style={styles.heading_style}>Experience</Text>
            <View>
              <Pressable
                style={styles.button_style}
                onPress={() => navigation.navigate("Description")}
              >
                <Text style={styles.button_text}>Highlights</Text>
                <Ionicons
                  name="chevron-forward-circle"
                  size={30}
                  color="#01877E"
                />
              </Pressable>
              <Pressable style={styles.button_style}
               onPress={() => navigation.navigate("Description")}
              >
                <Text style={styles.button_text}>Full description</Text>
                <Ionicons
                  name="chevron-forward-circle"
                  size={30}
                  color="#01877E"
                />
              </Pressable>
              <Pressable style={styles.button_style}
               onPress={() => navigation.navigate("Description")}
              >
                <Text style={styles.button_text}>Includes</Text>
                <Ionicons
                  name="chevron-forward-circle"
                  size={30}
                  color="#01877E"
                />
              </Pressable>
              <Pressable style={styles.button_style}
               onPress={() => navigation.navigate("Description")}>
                <Text style={styles.button_text}>Not Suitable for</Text>
                <Ionicons
                  name="chevron-forward-circle"
                  size={30}
                  color="#01877E"
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Text style={styles.heading_style}>Prepare for the activity</Text>
            <View>
              <Pressable style={styles.button_style}
               onPress={() => navigation.navigate("Description")}
              >
                <Text style={styles.button_text}>What to bring</Text>
                <Ionicons
                  name="chevron-forward-circle"
                  size={30}
                  color="#01877E"
                />
              </Pressable>
              <Pressable style={styles.button_style}
               onPress={() => navigation.navigate("Description")}
              >
                <Text style={styles.button_text}>Know before you go</Text>
                <Ionicons
                  name="chevron-forward-circle"
                  size={30}
                  color="#01877E"
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.customer_container}>
            <Text style={styles.heading_style}>Customer Reviews</Text>
            <View style={{ flexDirection: "row", paddingTop: 5 }}>
              <Pressable>
                <Ionicons name="star" size={30} color="#ffdd02" />
              </Pressable>
              <Pressable>
                <Ionicons name="star" size={30} color="#ffdd02" />
              </Pressable>
              <Pressable>
                <Ionicons name="star" size={30} color="#ffdd02" />
              </Pressable>
              <Pressable>
                <Ionicons name="star" size={30} color="#ffdd02" />
              </Pressable>
              <Pressable>
                <Ionicons name="star" size={30} color="#ffdd02" />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <View style={styles.footer_style}>
        <Text style={styles.footer_text} numberOfLines={2}>
          From {"\n"}
          Rs. {selectedplace.price} per person
        </Text>
        <Pressable style={styles.footer_button} onPress={book_place}>
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
    fontSize: 23,
    // fontWeight: "bold",
    color: "#01877E",
    fontFamily: "Podkova",
    // textAlign: "center",
    justifyContent: "center",
    marginTop: 7,
    marginRight: 10,
    marginLeft: 10,
    // fontFamily: "sans-serif-condensed",
    // textShadowColor: "black",
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 1,
  },

  home_image: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
    marginTop: 30,

    borderColor: "transparent",
    borderBottomColor: "#01877E",
    borderLeftColor: "#01877E",
    borderRightColor: "#01877E",
    borderWidth: 1,
  },
  norm_text: {
    color: "#01877E",
    fontSize: 15,
    // fontWeight: "bold",
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    fontFamily: "Podkova",
  },
  image_style: {
    width: 33,
    height: 30,
    marginLeft: 10,
    marginTop: 2,
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
  small_text: {
    color: "#01877E",
    fontSize: 15,
    paddingRight: 5,
    fontFamily: "Podkova",
  },
});