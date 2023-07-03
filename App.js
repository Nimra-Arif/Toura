import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StarterPage from "./components/starter_page";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login_page.js";
import SignUp1 from "./components/signup_page1.js";
import SignUp2 from "./components/signup_page2.js";
import Home from "./components/Home_page.js";
import MainPage from "./components/main_page";
import SearchPage from "./components/search_page";
import LaunchScreen from "./components/landing_page";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer
    independent={true}
    >
      <Stack.Navigator 
      initialRouteName="StarterPage"
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
