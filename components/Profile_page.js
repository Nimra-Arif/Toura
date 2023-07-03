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

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
        <View 
      style={{
        backgroundColor: "#01877E",
        height: 35,
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex:1

      }}
      >
 
      </View>
        <Text style={styles.text_style}
        >Profile </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },})