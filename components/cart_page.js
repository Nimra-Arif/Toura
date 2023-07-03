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

export default function Cart({ navigation }) {
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
      <ScrollView 
       style={{flex:1}}
      >
       <View
       
       style={{flex:1, marginTop:90,marginBottom:90
        
       }}>
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
              source={require("../assets/Nangaparbat_fairymedows.jpeg")}
              style={styles.image_style}
            />

            <View style={styles.text_container}>
              <Text style={styles.text_style2}>
                From Islamabad: 7 Days Tour of Fairy Meadows
              </Text>
            </View>
            <Pressable>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="calendar" style={styles.icon_style} />
              <Text style={styles.text_style3}>28 Feb 2024</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="time" style={styles.icon_style} />
              <Text style={styles.text_style3}>Opening hours: 8:30-9:30</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="timer" style={styles.icon_style} />
              <Text style={styles.text_style3}>Duration: 7 days</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="person-circle" style={styles.icon_style} />
              <Text style={styles.text_style3}>1 Adult</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="globe" style={styles.icon_style} />
              <Text style={styles.text_style3}>Language : English</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="cash" style={styles.icon_style} />
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={styles.text_style3}>Pay nothing today</Text>
                <Text style={styles.text_style4}>
                  Book now and pay on 26 Feb
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="checkmark" size={30} color="#00FF00" />
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={styles.text_style3}>Free Cancellation</Text>
                <Text style={styles.text_style4}>Until 12:00 AM on 27 Feb</Text>
              </View>
            </View>
            <Text
              style={{
                color: "red",
                fontSize: 23,
                marginTop: 5,
                marginLeft: 220,
              }}
            >
              Rs 30,000</Text>
          </View>
        </View>
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
              source={require("../assets/topsearch_2.jpeg")}
              style={styles.image_style}
            />

            <View style={styles.text_container}>
              <Text style={styles.text_style2}>
                From Islamabad: 7 Days Tour of Fairy Meadows
              </Text>
            </View>
            <Pressable>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="calendar" style={styles.icon_style} />
              <Text style={styles.text_style3}>28 Feb 2024</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="time" style={styles.icon_style} />
              <Text style={styles.text_style3}>Opening hours: 8:30-9:30</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="timer" style={styles.icon_style} />
              <Text style={styles.text_style3}>Duration: 7 days</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="person-circle" style={styles.icon_style} />
              <Text style={styles.text_style3}>1 Adult</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="globe" style={styles.icon_style} />
              <Text style={styles.text_style3}>Language : English</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="cash" style={styles.icon_style} />
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={styles.text_style3}>Pay nothing today</Text>
                <Text style={styles.text_style4}>
                  Book now and pay on 26 Feb
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="checkmark" size={30} color="#00FF00" />
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={styles.text_style3}>Free Cancellation</Text>
                <Text style={styles.text_style4}>Until 12:00 AM on 27 Feb</Text>
              </View>
            </View>
            <Text
              style={{
                color: "red",
                fontSize: 23,
                marginTop: 5,
                marginLeft: 220,
              }}
            >
              Rs 30,000</Text>
          </View>
        </View>
       </View>
      </ScrollView>
      <View style={styles.footer_style}>
        <Text style={styles.footer_text} numberOfLines={2}>
          Rs. 30,000 {"\n"} Subtotal
        </Text>
        <Pressable style={styles.footer_button}>
          <Text style={styles.footer_text}>Check out</Text>
        </Pressable>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header_style: {
    flex:0.2,
    borderColor: "#13313D",
    borderWidth: 2,
    borderRadius: 1,
    backgroundColor: "#01877E",
    height: 55,
    position: "absolute",
    // top: 0,
    marginTop: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  header_text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
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
    fontSize: 17,
    fontWeight: "bold",
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
  small_container: {
    // flex:1,
    margin:2,
  alignSelf: "center",
    // marginTop: 90,
    width: "97%",
   borderColor: "transparent",
   borderBottomColor: "#13313D",

    borderWidth: 2,
    

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
  },
  text_style2: {
    color: "#01877E",
    fontSize: 19,
    // fontWeight: "bold",
    margin: 10,
    marginRight: 2,
  },
  text_style3: {
    color: "#01877E",
    fontSize: 17,
    // fontWeight: "bold",
    // margin: 10,

    marginTop: 5,
    marginLeft: 9,
  },
  text_style4: {
    color: "#01877E",
    fontSize: 10,
    // fontWeight: "bold",
    // margin: 10,

    // marginTop: 5,
    // marginLeft: 9,
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
});
