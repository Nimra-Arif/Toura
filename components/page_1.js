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
import SearchPage from "./search_page";

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

export default function Activities({ navigation }) {
  const { userId, setUserId,places,setplaces,selectedplace,setselectedplace }= useContext(TouraContext);
  // let searchplace = "Fairy Meadows";
  const [tosearch, onchangetosearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  loadFonts();

  const options = [
    { option: "Recommended", value: "Recommended" },
    { option: "Price-High to Low", value: "Price-High to Low" },
    { option: "Price-Low to High", value: "Price-Low to High" },
    { option: "Rating", value: "Rating" },
    { option: "Stay Duration", value: "Stay Duration" },
    { option: "Time", value: "Time" },
    { option: "Distance", value: "Distance" },
  ];

  const handleOptionPress = (value) => {
    setSelectedOption(value);
    toggleModal();
  };

  function selectActivity(item) {


    setselectedplace(item.item);
    console.log("selected place is");
    // console.log(item);
    console.log(item.item.departure_spot);
    navigation.navigate("SecondPage");
  }

  return (
    <View>
      <SafeAreaView>
       

        <View style={styles.container2}>
          <Text style={styles.text_style}>Top Activities</Text>
          <Pressable style={{ flexDirection: "row" }} onPress={toggleModal}>
            <Text style={styles.text_style}>Sort by</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Ionicons name="arrow-up" size={23} color="#01877E" />
              <Ionicons name="arrow-down" size={23} color="#01877E" />
            </View>
          </Pressable>
        </View>
       
        {/* {selectedOption && <Text>Selected Option:{selectedOption}</Text>} */}
 <FlatList style={{marginBottom:100}}
          data={places}
          indicatorStyle="black"
          renderItem={({ item }) => (
            <View style={styles.button_container}>
            <Pressable style={styles.button_style}
            onPress={() => selectActivity({item})}
            >
              <View style={styles.small_containers}>
                <ImageBackground
                  source={require("../assets/topsearch_2.jpeg")}
                  style={styles.image_style}
                >
                  <Ionicons
                    name="heart-outline"
                    size={25}
                    color="red"
                    style={styles.icon_style}
                  />
                </ImageBackground>
              </View>
              <View style={styles.small_containers}>
                <Text style={styles.norm_text1}>
                 From {item.departure_spot} : {item.place_name} {"\n"} {item.duration}-days Tour
                </Text>
                
                <Text style={styles.norm_text2}>Date: {item.date}</Text>
                <Text style={styles.norm_text2}>Rating {item.rating}</Text>
                <Text style={styles.norm_text3}>
                 From Rs.{item.price} per person
                </Text>
              </View>
            </Pressable>
            
          </View>
          )}
        />
   
   <Modal
        
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay} />
        <View style={styles.modalContent}>
          {/* Render the options from the array */}
          {options.map((option) => (
            <Pressable
              key={option.option}
              style={styles.option}
              onPress={() => handleOptionPress(option.value)}
            >
              <Text style={styles.option_text}>{option.option}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>

      




      
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 30,
    fontFamily: "Podkova",
  },
  text_style: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    color: "#01877E",
    textAlign: "center",
    justifyContent: "center",
    // textShadowColor: "black",
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 1,
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
    width: "50%",
    height: 175,
    // borderColor: "black",
    // borderRadius: 20,
   
  },
  image_style: {
    margin: 2,
    width: "95%",
    height: "95%",
    borderColor: "black",
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: "black",
    // borderRadius: 20,

    // borderRadius: 20,

    flexDirection: "column-reverse",
    resizeMode: "contain",
  },
  button_style: {
    backgroundColor: "white",
    width: "90%",
    height: 190,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,
    marginBottom: 20,
    borderColor: "13313D",
    borderWidth: 1,
    flexDirection: "row",
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
    justifyContent: "center",
    alignItems: "center",
  },

  button_text: {
    color: "#01877E",
    fontSize: 17,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    marginRight: 15,
  },

  input_style: {
    fontSize: 18,
    flexDirection: "row",
    fontFamily: "Podkova",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 25,
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    padding: 17,
    fontSize: 20,
    fontWeight: "bold",
    color: "#01877E",
    borderColor: "transparent",
    borderBottomColor: "#01877E",
    borderWidth: 1,
  },
  option_text: {
    fontSize: 17,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    color: "#01877E",
  },
  norm_text1: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    color: "#01877E",
    margin: 0,
  },
  norm_text2: {
    fontSize: 15,
    fontFamily: "Podkova",
    color: "red",
  },
  norm_text3: {
    fontSize: 18,
    fontFamily: "Podkova",
    color: "#01877E",
  },
  icon_style: {
    
      position: "absolute",
      top: 10,
      right: 10,
      opacity: 0.7,
    
  },
});

 {/* <View style={{ paddingTop: 10 }}>
          <Text style={styles.text_style2}>Where do you want to go?</Text>
        </View> */}
        {/* <View style={styles.search_style}>
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

          <Pressable onPress={()=> navigation.navigate("SecondPage")}>
            <Ionicons name="arrow-forward-circle" size={30} color="#01877E" />
          </Pressable>
        </View> */}