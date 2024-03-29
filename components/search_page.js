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
import { query, where, getDocs, deleteDoc, copyDoc,updateDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";

const data = [
  { key: "hunza", value: "Hunza" },
  { key: "fairy meadows", value: "Fairy Meadows" },
  { key: "mushk pori top", value: "Mushk Pori Top" },
  { key: "shogran", value: "Shogran" },
  { key: "gilgit", value: "Gilgit" },
  { key: "naltar", value: "Naltar" },
  { key: "khunjerab", value: "Khunjerab" },
  { key: "k2", value: "K2" },
  { key: "nanga parbat", value: "Nanga Parbat" },
  { key: "deosai", value: "Deosai" },
  { key: "shandur", value: "Shandur" },
  { key: "shangrila", value: "Shangrila" },
];

export default function SearchPage({ navigation }) {
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
    Wishlistplace,
    setWishlistplace,
    activitiesid,
    setactivitiesid,
    
    topplaces,
    settopplaces,
  } = useContext(TouraContext);

  const [Recommendedplaces, setRecommendedplaces] = useState([]);
  useEffect(() => {
    // Update Recommendedplaces and Wishlistplace using map function
    const updatedWishlist = topplaces.map((place) => {
      // Check if the item is already in the Wishlistplace array
      const index = Wishlistplace.findIndex(
        (wishlistItem) => wishlistItem.place_name === place.place_name
      );
      // If the item is in the wishlist, set the iconColor to "red", otherwise set it to "white"
      const iconColor = index !== -1 ? "red" : "white";
      return {
        ...place,
        iconColor,
      };
    });
    setRecommendedplaces(updatedWishlist);

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
  }, [Wishlistplace, topplaces]);

  // ... (rest of the component)

  
 

  async function search_next_button(val) {
    console.log("search next button pressed");
    tosearch = val.toLowerCase().trim();
    console.log(tosearch);
    onchangetosearch(val);

    const q = query(
      collection(db, "place"),
      where("place_name", "==", tosearch)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No such document!");
      } else {
        const newPlaces = [];
        const newid = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().place_name);
          newPlaces.push(doc.data());
          newid.push(doc.id);
        });
        navigation.navigate("Activities");
        setplaces(newPlaces);
        setactivitiesid(newid);
      }
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  }
  function selectActivity(item) {
    setselectedplace(item.item);
    console.log("selected place is");
    // console.log(item);
    console.log(item.item.departure_spot);
    navigation.navigate("SecondPage2");
  }
  function addtoWishlist(item) {
    const updatedAllPlaces = Recommendedplaces.map((place) => {
      if (place.place_name === item.place_name) {
        // If the place matches the item clicked, toggle the heart icon color
        const newColor = place.iconColor === "white" ? "red" : "white";
        return {
          ...place,
          iconColor: newColor,
        };
      }
      return place;
    });

    setRecommendedplaces(updatedAllPlaces);

    // Check if the item is already in the wishlist
    const index = Wishlistplace.findIndex(
      (wishlistItem) => wishlistItem.place_name === item.place_name
    );

    if (index !== -1) {
      // If the item is in the wishlist, remove it from the wishlist
      const updatedWishlist = [...Wishlistplace];
      updatedWishlist.splice(index, 1);
      setWishlistplace(updatedWishlist);
    } else {
      // If the item is not in the wishlist, add it to the wishlist
      setWishlistplace([...Wishlistplace, item]);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.text_style2}>Where do you want to go?</Text>
        </View>

        <View>
          <SelectList
            setSelected={(val) => search_next_button(val)}
            data={data}
            save="value"
            // style={styles.search_style}
            search={true}
            maxHeight={200}
            inputStyles={styles.input_style}
            placeholder="Search for a place"
            boxStyles={{
              
              width: "85%",
              height: 50,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 20,
              backgroundColor: "white",
              shadowColor: "black",
              shadowOffset: { width: 5, height: 5 },
              shadowRadius: 5,
              shadowOpacity: 0.4,
              elevation: 5,
            }}
            dropdownStyles={{
              width: "85%",
              borderRadius: 20,
              justifyContent: "center",
              // alignItems: "center",
              alignSelf: "center",
              backgroundColor: "white",
              shadowColor: "black",
              shadowOffset: { width: 5, height: 5 },
              shadowRadius: 5,
              shadowOpacity: 0.4,
              elevation: 5,
              zIndex: 1,
            }}
            dropdownTextStyles={styles.input_style}
          />
        </View>

        <View>
          <Text style={styles.text_style2}>Recommended Places</Text>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={Recommendedplaces}
          renderItem={({ item }) => (
            <Pressable onPress={() => selectActivity({ item })}>
              <View style={styles.small_containers}>
                <ImageBackground
                  source={{ uri: item.img }}
                  style={styles.image_style}
                >
                  <Pressable
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      opacity: 0.7,
                    }}
                    onPress={() => {
                      addtoWishlist(item);
                    }}
                  >
                    <Ionicons
                      name="heart"
                      size={25}
                      color={item.iconColor} // Use the stored iconColor for this place
                      // color="red"
                    />
                  </Pressable>
                  <Text style={styles.norm_text}>{item.place_name}</Text>
                </ImageBackground>
              </View>
            </Pressable>
          )}
        />

        <ScrollView>
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
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    marginBottom: 40,
    width: 220,
    height: 160,
    margin: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,

    borderRadius: 20,
    overflow: "hidden",
  },
  image_style: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    flexDirection: "column-reverse",
    resizeMode: "contain",
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
    width: "100%",
    fontSize: 17,
    flexDirection: "row",
    fontFamily: "Podkova",
    color: "#01877e",
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
    paddingRight: 0,
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
    zIndex: 1,

    margin: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,
    marginBottom: 20,
    // borderColor: "13313D",
    // borderWidth: 1,
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
    borderRadius: 7,
  },
  searchItemText: {
    fontSize: 16,
    color: "#333333",
    paddingLeft: 20,
    color: "white",
    fontFamily: "Podkova",
  },
});
