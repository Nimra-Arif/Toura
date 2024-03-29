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
import { query, where, getDocs, deleteDoc, copyDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
import { ScrollView } from "react-native";
import SearchPage from "./search_page";
import WelcomePage from "./welcome_page";
import Activities from "./page_1";
import SecondPage from "./page_2";
import SecondPage2 from "./page3";
import Description from "./description_page";
import Cart from "./cart_page";
import Bookings from "./booking_page";
import Billing from "./Billings";
import PlaceGuidlines from "./place_guidlines";


async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function Home({ navigation }) {


  const { userId, setUserId,places,setplaces,selectedplace,
    setselectedplace,cartedplaces,setcartedplaces }= useContext(TouraContext);

  const Stack = createStackNavigator();


  loadFonts();
  return (

    <Stack.Navigator initialRouteName="WelcomePage">
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{ headerShown: false, fontFamily: "Playball" }}
      />
      <Stack.Screen
        name="SecondPage2"
        component={SecondPage2}
        options={{ headerShown: false, fontFamily: "Playball" }}
      />

      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerStyle: {
            backgroundColor: "#01877E",
            height: 80,
          },
          headerTitleStyle: {
            fontFamily: "Podkova",
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Activities"
        component={Activities}
        options={{
          headerStyle: {
            backgroundColor: "#01877E",
            height: 80,
          },
          headerTitleStyle: {
            fontFamily: "Podkova",
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Description"
        component={Description}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Billing"
        component={Billing}
        options={{
          headerStyle: {
            backgroundColor: "#01877E",
            height: 80,
          },
          headerTitleStyle: {
            fontFamily: "Podkova",
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaceGuidlines"
        component={PlaceGuidlines}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

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
    shadowColor: "black",
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
    borderColor: "white",
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

