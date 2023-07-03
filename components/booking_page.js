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

export default function Bookings({ navigation }) {
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
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 90, marginBottom: 90 }}>
        <View style={styles.small_container}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
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
                <Pressable style={styles.button_style2}>
                  <Text style={styles.text_style}>Cancel Booking</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.small_container}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
            <View style={styles.inner_container1}>
              <Image
                source={require("../assets/topsearch_1.jpeg")}
                style={styles.image_style}
              />

              <View style={styles.text_container}>
                <Text style={styles.text_style2}>
                  From Islamabad: 7 Days Tour of Fairy Meadows
                </Text>
              </View>
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
                <Pressable style={styles.button_style2}>
                  <Text style={styles.text_style}>Cancel Booking</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  small_container: {
    margin: 2,
    alignSelf: "center",
    // marginTop: 90,
    width: "100%",

    padding: 25,

    backgroundColor: "#01877e",
    borderRadius: 10,
  },

  text_style: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "center",
  },
  text_style2: {
    color: "white",
    fontSize: 18,
    // fontWeight: "bold",
    margin: 15,
    marginRight: 2,
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
    color: "white",
    fontSize: 27,
    marginTop: 5,
    marginLeft: 5,
  },
});
