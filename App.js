
import { StyleSheet, Text, View } from "react-native";
import StarterPage from "./components/starter_page";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login_page.js";
import SignUp1 from "./components/signup_page1.js";
import SignUp2 from "./components/signup_page2.js";
import React, { useEffect } from "react";
import * as Font from 'expo-font';
import MainPage from "./components/main_page";
import LaunchScreen from "./components/landing_page";
import { TouraProvider ,TouraContext} from "./Global/TouraContext";


async function loadFonts() {
 await Font.loadAsync({
   'Podkova': require('./assets/fonts/Podkova.ttf'),
   "Playball": require('./assets/fonts/Playball.ttf'),
   // Add other custom fonts here if needed
 });
}

const Stack = createStackNavigator();




export default function App() {

  useEffect(() => {
    loadFonts();
  }, []);
  return (
   <TouraProvider>
     <NavigationContainer
    independent={true}
    >
      <Stack.Navigator 
      initialRouteName="LaunchScreen"
      screenOptions={
        {headerShown: false}
     
      }>
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
        <Stack.Screen name="Starting Page" component={StarterPage} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp1" component={SignUp1}/>
        <Stack.Screen name="MainPage" component={MainPage}/>
      </Stack.Navigator>
    </NavigationContainer>
 </TouraProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
