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
  Button,


} from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { query, where, getDocs, deleteDoc, copyDoc ,updateDoc} from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
import { ScrollView } from "react-native";
import { Video } from 'expo-av';
// import Video from 'react-native-video';
import * as Animatable from "react-native-animatable";
import TypeWriter from "@sucho/react-native-typewriter";
// import { Button } from "react-native-web";

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function Bookings({ navigation }) {
  
  const    { userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces ,bookedplaces, setbookedplaces,placetype, setplacetype,
    cartitems,setcart_items,Wishlistplace,setWishlistplace,activitiesid,setactivitiesid,Recommendedplaces,setRecommendedplaces,
    topplaces,settopplaces
  } = useContext(TouraContext);
 
  // const [vidset, setvidset] = useState(false);
  const [emptypage, setemptypage] = useState(false);
  useEffect(() => {
    loadFonts();
    

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
  
  


    setcart_items(cartedplaces.length);

    if (bookedplaces.length === 0) {
      // console.log("bookedplaces is empty");
      setemptypage(true);
    } else {
      setemptypage(false);
    }

  },[cartedplaces,bookedplaces,Wishlistplace]);
  function cancelbooking(item) {
    console.log("item......", item.place_name);
    const updatedbookings = bookedplaces.filter(
      (booking) => booking.place_name !== item.place_name
    )
    setbookedplaces(updatedbookings);
    console.log("updated cart");
    if(updatedbookings.length==0){
      navigation.navigate("WelcomePage");
    }
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
      <View style={styles.header_style}>
        <Text style={styles.header_text} numberOfLines={2}>
          Bookings
        </Text>
      </View>
     
      {emptypage && (
     <View
     style={{
        // flex: 1,
     }}
     >
      
        <Video
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/toura-470c7.appspot.com/o/ProfilePictures%2Fvid5.mp4?alt=media&token=004c3c82-aab0-413f-9fe4-5829fb262aa1",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: "80%", height: "45%", marginTop: 220,
          alignSelf: "center", borderRadius: 20, 
          opacity: 1, 
          // borderColor : "#01877E",
          // borderWidth: 2,

        
        }}

        />
        <Pressable
          onPress={() => 
           {navigation.navigate("Search");}
          
          }
       style={styles.button_style3}
        >
          <Text style={styles.slogan_style}>Find Things to do</Text>
        
        </Pressable>
      
     
      </View>
      )}

      <FlatList
        style={{ marginTop: 90, flex: 1 }}
        data={bookedplaces}
        indicatorStyle="black"
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <View style={styles.small_container}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
              <View style={styles.inner_container1}>
                <Image
                 source={{uri: item.img}}
                  style={styles.image_style}
                />

                <View style={styles.text_container}>
                  <Text style={styles.text_style2}>
                    From {item.departure_spot} : {"\n"}
                    {item.duration}-days Tour of {item.place_name}
                  </Text>
                </View>
              </View>
              <View style={styles.inner_container2}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="calendar" style={styles.icon_style} />
                  <Text style={styles.text_style3}>{item.date}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="time" style={styles.icon_style} />
                  <Text style={styles.text_style3}>
                    {" "}
                    Opening hours: {item.opening_timings}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Pressable style={styles.button_style}>
                    <Text style={styles.text_style}>View Details</Text>
                  </Pressable>
                  <Pressable
                    style={styles.button_style2}
                    onPress={() => {
                      cancelbooking(item);
                    }}
                  >
                    <Text style={styles.text_style}>Cancel Booking</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
      />
           
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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

    justifyContent: "center",
    zIndex: 1,
  },
  header_text: {
    color: "white",
    fontSize: 25,
    // fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Podkova",
  },

  button_style: {
    backgroundColor: "#13313D",
    width: 130,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    borderColor: "white",
    borderWidth: 1,
    fontWeight: "bold",
  },
  button_style2: {
    backgroundColor: "red",
    width: 130,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  button_style3: {
    backgroundColor: "#01877e",
    width: "70%",
    alignSelf: "center",
    justifyContent: "center",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    borderColor: "#13313D",
    borderWidth: 1.7,
    marginLeft: 10,
    marginBottom: 7,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    opacity: 1,
    marginTop: -10,
  },

  slogan_style: {
    color: "white",

    fontSize: 22,
    fontFamily: "Podkova",
  
    alignSelf: "center",
    
    // fontStyle: "italic",
   
  },
  small_container: {
    margin: 8,
    alignSelf: "center",
    // marginTop: 90,
    width: "99%",

    padding: 15,

    backgroundColor: "#01877e",
    borderRadius: 20,
  },

  text_style: {
    color: "white",
    fontSize: 15,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    marginLeft: 10,
    alignSelf: "center",
  },
  text_style2: {
    color: "white",
    fontSize: 25,
    // fontWeight: "bold",
    margin: 15,
    // marginRight: 2,
    fontFamily: "Podkova",
  },
  text_container: {
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
  },
  text_style3: {
    color: "white",
    fontSize: 17,
    fontFamily: "Podkova",
    // fontWeight: "bold",
    // margin: 10,

    marginTop: 5,
    marginLeft: 9,
  },
  text_style4: {
    color: "#01877E",
    fontSize: 10,
    fontFamily: "Podkova",
    // fontWeight: "bold",
    // margin: 10,

    // marginTop: 5,
    // marginLeft: 9,
  },

  image_style: {

    width: 120,
    height: 100,


    borderRadius: 10,
   
    // marginTop: 200,
    alignSelf: "center",
    // marginBottom: 20,
    
  },
  inner_container1: {
    flexDirection: "row",
  },
  inner_container2: {
    flexDirection: "column",
  },
  icon_style: {
    color: "white",
    fontSize: 27,
    marginTop: 5,
    marginLeft: 5,
  },
});
