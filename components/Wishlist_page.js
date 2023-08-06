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
  Alert,
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

async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function Wishlist({ navigation }) {
  const { userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces ,bookedplaces, setbookedplaces,placetype, setplacetype,
    cartitems,setcart_items,Wishlistplace,setWishlistplace
  }= useContext(TouraContext);
  const [emptypage, setemptypage] = useState(true);
  useEffect(() => {
    loadFonts();

    if (Wishlistplace.length === 0) {
      setemptypage(true);
    }
    else{
      setemptypage(false);
    }
   

    
  });

 

  function Wishlistout(item) {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to remove this item from your wishlist?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedWishlist = Wishlistplace.filter(
              (wishlist) => wishlist.place_name !== item.place_name
            );
            setWishlistplace(updatedWishlist);
            console.log("updated cart");
            if (updatedWishlist.length === 0) {
              navigation.navigate("WelcomePage");
            }
          },
          style: "destructive",
        },
      ]
    );
  }
  function selectActivity(item) {
    setselectedplace(item.item);
    console.log("selected place is");
    // console.log(item);
    console.log(item.item.departure_spot);
    navigation.navigate("SecondPage2");
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
         Wishlist
        </Text>
      </View>
{emptypage &&(
  <View style={{alignSelf:"center",marginTop:350}}>

<Text style={{fontSize:23,fontFamily:"Podkova",color:"#01877E",alignSelf:"center",textAlign:"center"

}}>Your Wishlist is Empty at the moment</Text>
  </View>
)}


      <FlatList
        style={{ marginBottom: 1, marginTop: 90, flex: 1 }}
        data={Wishlistplace}
        indicatorStyle="black"
        renderItem={({ item }) => (
          <View>
           
              <Pressable style={styles.small_container}
               onPress={() => selectActivity({item})}
              >
               
                <View style={styles.inner_container1}>
                  <Image
                    source={{uri: item.img}}

                    style={styles.image_style}
                  />

                  <View style={styles.text_container}>
                    
                    <Text style={styles.text_style2}>
                     <Text>
                     From {item.departure_spot} :{item.duration}-days Tour of
                      {"\n"}
                      {item.place_name}
                     </Text>
                      <Text style={styles.price_style}>{"\n"}
                        Rs {item.price}</Text>
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      Wishlistout(item);
                    }}
                  >
                    <Ionicons
                      name="heart"
                      size={30}
                      color="red"
                      marginTop={35}
                      marginRight={17}
                    />
                  </Pressable>
                </View>
                
              
              </Pressable>
         
          </View>
        )}
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: "black",
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
    // margin: 12,
    alignSelf: "center",
    // marginTop: 90,
    width: "97%",
    borderColor: "transparent",
    borderBottomColor: "#01877e",

    borderWidth: 1.5,
    
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
    flexDirection: "column",
  },
  image_style: {
    width: 129,
    height: 150,
    borderRadius: 10,
    marginLeft: 7,
  },
  inner_container1: {
    flexDirection: "row",
    margin: 10,
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
    fontSize: 22,
    marginTop: 5,
    marginLeft: 220,
    fontFamily: "Podkova",
  },
  inner_container3: { flexDirection: "row", alignItems: "center" },
});