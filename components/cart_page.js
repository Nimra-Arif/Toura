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
  FlatList,
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
import { Video } from 'expo-av';
import SearchPage from "./search_page";

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function Cart({ navigation }) {
  const [emptypage, setemptypage] = useState(false);
  const    { userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces ,bookedplaces, setbookedplaces,placetype, setplacetype,
    cartitems,setcart_items,Wishlistplace,setWishlistplace,activitiesid,setactivitiesid,Recommendedplaces,setRecommendedplaces,
    topplaces,settopplaces
  } = useContext(TouraContext);
  loadFonts();


  useEffect(() => {
 
    setcartedplaces(cartedplaces);
    setcart_items(cartedplaces.length);
    if (cartedplaces.length === 0) {
      // console.log("bookedplaces is empty");
      setemptypage(true);
    } else {
      
      setemptypage(false);
      console.log("cartedplaces is not empty");
    }
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
  },[cartedplaces, Wishlistplace, bookedplaces]);

  let cart_price = 0;

  for (let i = 0; i < cartedplaces.length; i++) {
    cart_price = cart_price + cartedplaces[i].price;
  }

  function cartout(item) {
    // console.log("item", item.place_name);
    const updatedCart = cartedplaces.filter((cartItem) => cartItem !== item);
    setcartedplaces(updatedCart);
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
          Shopping Cart
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

        
        }}

        />
        <Pressable
        style={styles.button_style3}
        onPress={() => navigation.navigate("Search")}

        >
          <Text style={styles.slogan_style}>Find Things to do</Text>
        </Pressable>
     
      </View>
      )}
      <FlatList
        style={{ marginBottom: 60, marginTop: 90, flex: 1 }}
        data={cartedplaces}
        indicatorStyle="black"
        renderItem={({ item }) => (
          <View>
            <View

            // style={{ flex: 1, marginTop: 90, marginBottom: 90 }}
            >
              <View style={styles.small_container}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable style={styles.waiting_button}>
                    <Text style={styles.text_style}>
                      We'll hold your spot for 60 minutes
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.inner_container1}>
                  <Image
                    source={{uri: item.img}}
                    style={styles.image_style}
                  />

                  <View style={styles.text_container}>
                    <Text style={styles.text_style2}>
                      From {item.departure_spot} :{item.duration}-days Tour of
                      {"\n"}
                      {item.place_name}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      cartout(item);
                    }}
                  >
                    <Ionicons
                      name="trash"
                      size={30}
                      color="red"
                      marginTop={15}
                      marginLeft={17}
                    />
                  </Pressable>
                </View>
                <View style={styles.inner_container2}>
                  <View style={styles.inner_container3}>
                    <Ionicons name="calendar" style={styles.icon_style} />
                    <Text style={styles.text_style3}>{item.date}</Text>
                  </View>

                  <View style={styles.inner_container3}>
                    <Ionicons name="time" style={styles.icon_style} />
                    <Text style={styles.text_style3}>
                      Opening hours: {item.opening_timings}
                    </Text>
                  </View>
                  <View style={styles.inner_container3}>
                    <Ionicons name="timer" style={styles.icon_style} />
                    <Text style={styles.text_style3}>
                      Duration: {item.duration} days
                    </Text>
                  </View>
                  <View style={styles.inner_container3}>
                    <Ionicons name="person-circle" style={styles.icon_style} />
                    <Text style={styles.text_style3}>1 Adult</Text>
                  </View>
                  <View style={styles.inner_container3}>
                    <Ionicons name="globe-outline" style={styles.icon_style} />
                    <Text style={styles.text_style3}>Language : English</Text>
                  </View>
                  {/* <View style={styles.inner_container3}>
                    <Ionicons name="wallet" style={styles.icon_style} />
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.text_style3}>Pay nothing today</Text>
                      <Text style={styles.text_style4}>
                        Book now and pay three days before your tour
                      </Text>
                    </View>
                  </View> */}
                  <View style={styles.inner_container3}>
                    <Ionicons name="checkmark" size={30} color="#00FF00" />
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.text_style3}>Free Cancellation</Text>
                      <Text style={styles.text_style4}>
                        Until 12:00 AM one day before your tour
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.price_style}>Rs {item.price}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.footer_style}>
        <Text style={styles.footer_text} numberOfLines={2}>
          Rs. {cart_price} {"\n"} Subtotal
        </Text>
        <Pressable
          style={styles.footer_button}
          disabled={cartedplaces.length == 0 ? true : false}
          opacity={cartedplaces.length == 0 ? 0.3 : 1}
          onPress={() => {
            navigation.navigate("Billing");
          }}
        >
          <Text style={styles.footer_text}>Check out</Text>
        </Pressable>
      </View>

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
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

  header_style: {
    // flex: 0.2,
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
    marginLeft: 10,
    fontFamily: "Podkova",
  },
  footer_style: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#13313D",
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: "#01877E",
    height: 60,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footer_text: {
    color: "white",
    fontSize: 19,
    // fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Podkova",
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
  small_container: {
    // flex:1,
    margin: 2,
    alignSelf: "center",
    // marginTop: 90,
    width: "97%",
    borderColor: "transparent",
    borderBottomColor: "#01877e",

    borderWidth: 2,
  },
  slogan_style: {
    color: "white",

    fontSize: 22,
    fontFamily: "Podkova",
  
    alignSelf: "center",
    
    // fontStyle: "italic",
   
  },
  waiting_button: {
    backgroundColor: "#13313D",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: 10,
    marginBottom: 7,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    opacity: 0.9,
  },
  text_style: {
    color: "white",
    fontSize: 18,
    // fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Podkova",
  },
  text_style2: {
    color: "#01877E",
    fontSize: 19,
    // fontWeight: "bold",
    margin: 10,
    marginRight: 2,
    fontFamily: "Podkova",
  },
  text_style3: {
    color: "#01877E",
    fontSize: 17,
    // fontWeight: "bold",
    // margin: 10,
    fontFamily: "Podkova",
    marginTop: 5,
    marginLeft: 9,
  },
  text_style4: {
    color: "#01877E",
    fontSize: 10,
    // fontWeight: "bold",
    // margin: 10,
    fontFamily: "Podkova",
    // marginTop: 5,
    paddingLeft: 15,
  },
  text_container: {
    width: "50%",
  },
  image_style: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 7,
  },
  inner_container1: {
    flexDirection: "row",
  },
  inner_container2: {
    flexDirection: "column",
  },
  icon_style: {
    color: "#01877E",
    fontSize: 27,
    marginTop: 5,
    marginLeft: 5,
  },
  price_style: {
    color: "red",
    fontSize: 23,
    marginTop: 5,
    marginLeft: 220,
    fontFamily: "Podkova",
  },
  inner_container3: { flexDirection: "row", alignItems: "center" },
});
