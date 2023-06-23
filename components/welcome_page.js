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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
import { ScrollView } from "react-native";
import SearchPage from "./search_page";

export default function WelcomePage({ navigation }) {
  return (
    <ScrollView>
      <SafeAreaView>
        <ImageBackground
          style={styles.home_image}
          source={require("../assets/home_page_img.png")}
        >
          <Text style={styles.text_style}>Hi, Welcome to Toura</Text>
        </ImageBackground>
        <View>
          <Text style={styles.text_style2}>Top Searches</Text>
        </View>
        <ScrollView horizontal={true}
        showsHorizontalScrollIndicator={false}
        >

           <View style={styles.small_containers}>
            <ImageBackground source={require("../assets/topsearch_1.jpeg")}
              style={styles.image_style}
              >
                <Ionicons name="heart" size={25} color="white"    
                style={{position:"absolute",top:10,right:10,opacity:0.7,
               
              }}
                />
      <Text style={styles.norm_text}>Fairy Meadows</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground source={require("../assets/topsearch_2.jpeg")}
              style={styles.image_style}
              >
                <Ionicons name="heart" size={25} color="white" 
                style={{position:"absolute",top:10,right:10,opacity:0.7,
              }}
                />
       <Text style={styles.norm_text}>Mushk Pori Top</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground source={require("../assets/land_page_toura.jpeg")}
             style={styles.image_style}>
              <Ionicons name="heart" size={25} color="white"  
                style={{position:"absolute",top:10,right:10,opacity:0.7
              }}
                />
             <Text style={styles.norm_text}>Hunza Valley</Text>
            </ImageBackground>
          </View>
           <View style={styles.small_containers}>
            <ImageBackground source={require("../assets/topsearch_1.jpeg")}
              style={styles.image_style}
              >
                <Ionicons name="heart" size={25} color="white" 
                style={{position:"absolute",top:10,right:10,opacity:0.7
              }}
                />
      <Text style={styles.norm_text}>Fairy Meadows</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground source={require("../assets/topsearch_2.jpeg")}
              style={styles.image_style}
              >
                <Ionicons name="heart" size={25} color="white" 
                style={{position:"absolute",top:10,right:10,opacity:0.7
              }}
                />
       <Text style={styles.norm_text}>Mushk Pori Top</Text>
            </ImageBackground>
          </View>
          <View style={styles.small_containers}>
            <ImageBackground source={require("../assets/land_page_toura.jpeg")}
             style={styles.image_style}>
              <Ionicons name="heart" size={25} color="white" 
                style={{position:"absolute",top:10,right:10,opacity:0.7
              }}
                />
             <Text style={styles.norm_text}>Hunza Valley</Text>
            </ImageBackground>
          </View>
          
        
        
        </ScrollView>
        <View>
          <Text style={styles.text_style2}>Browse Categories</Text>
        </View>
        <View style={styles.button_container}>
          <Pressable style={styles.button_style}
          onPress={() => navigation.navigate("Search")}
          >
        
            <Text style={styles.button_text}
            >Camping</Text>
               <Ionicons name="arrow-forward-circle" size={30} color="#01877E" />
          </Pressable>
          <Pressable style={styles.button_style}>
            <Text style={styles.button_text}
            >Hiking</Text>
               <Ionicons name="arrow-forward-circle" size={30} color="#01877E" />
          </Pressable>
          <Pressable style={styles.button_style}>
         
            <Text style={styles.button_text}
            >Climbing</Text>
               <Ionicons name="arrow-forward-circle" size={30} color="#01877E" />
          </Pressable>
          <Pressable style={styles.button_style}>
         
            <Text style={styles.button_text}
            >Forest</Text>
               <Ionicons name="arrow-forward-circle" size={30} color="#01877E" />
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#01877E",
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 70,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  text_style2: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#01877E",
    textAlign: "center",
    justifyContent: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    paddingTop: -20,
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
    // shadowColor: 'black',
    // shadowOffset: { width: 1, height: 1 },
    // shadowRadius: 1,
    // shadowOpacity: 0.4,
    // elevation: 5,
    // borderRadius: 2,




  },
  small_containers: {
    marginTop: 30,
marginBottom: 30,
    width: 140,
    height: 140,
    margin: 20,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,
    borderRadius: 40,
  },
  image_style: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor:"white",
    borderRadius: 20,
    flexDirection: "column-reverse",
   
  },
  button_style: {
    backgroundColor: "white",
    width: "50%",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 5,
    marginBottom: 20,
    borderColor:"13313D",
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
    fontWeight: "bold",
    marginRight: 15,
  },
  norm_text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    margin: 10,

  
  },
});