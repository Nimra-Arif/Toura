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
} from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { query, where, getDocs, deleteDoc, copyDoc,updateDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
import { ScrollView } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Billing({ navigation }) {
  const [name, onchangename] = useState("");
  const [email, onchangeemail] = useState("");
  const [phone, onchangephone] = useState("");
  const [country, onchangecountry] = useState("Select Country");
  const [modalVisible, setModalVisible] = useState(false);



  const handleCountrySelect = (selectedCountry) => {
    onchangecountry(selectedCountry.name);
    setModalVisible(false);
  };
  const    { userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces ,bookedplaces, setbookedplaces,placetype, setplacetype,
    cartitems,setcart_items,Wishlistplace,setWishlistplace,activitiesid,setactivitiesid,Recommendedplaces,setRecommendedplaces,
    topplaces,settopplaces
  } = useContext(TouraContext);

  let cart_price = 0;

  for (let i = 0; i < cartedplaces.length; i++) {
    cart_price = cart_price + cartedplaces[i].price;
  }
  
  const q = query(collection(db, "users"), where("uid", "==", userId));
getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      onchangename(doc.data().username);
      onchangeemail(doc.data().email);
    })
})

  function book_place() {
    console.log("bookedplace");
   setbookedplaces(
      [...bookedplaces, ...cartedplaces]
   )
    navigation.navigate("Bookings");
    setcartedplaces([]);
    setcart_items(0);
   
  }
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Podkova: require("../assets/fonts/Podkova.ttf"),
        Playball: require("../assets/fonts/Playball.ttf"),
      });
    };
  
    loadFonts();
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
    });
  }, [Wishlistplace,cartedplaces,bookedplaces]);
  
  return (
    <ScrollView style={styles.container}>
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

      <View>
        <Text style={styles.header_text}>Billing Details</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : { height: 100 }}
      >
        <View style={styles.small_container}>
          <TextInput
            value={name}
            placeholder="Name"
            onChangeText={(name) => {
              onchangename(name);
            }}
            style={styles.input_style}
            placeholderTextColor="#Ebe8"
            clearButtonMode="always"
          ></TextInput>
        </View>
        <View style={styles.small_container}>
          <TextInput
            value={email}
            placeholder="Email"
            onChangeText={(email) => {
              onchangeemail(email);
            }}
            style={styles.input_style}
            placeholderTextColor="#Ebe8"
            keyboardType="email-address"
            clearButtonMode="always"
          ></TextInput>
        </View>
        <View style={styles.small_container}>
          <TextInput
            value={phone}
            placeholder="Phone number"
            onChangeText={(phone) => {
              onchangephone(phone);
            }}
            style={styles.input_style}
            placeholderTextColor="#Ebe8"
            clearButtonMode="always"
            keyboardType="phone-pad"
          ></TextInput>
        </View>
        <View style={styles.picker_container}>
          <CountryPicker
            visible={modalVisible}
            placeholder={country}
            theme={{
              color: "#018773",
              fontFamily: "Podkova",
              textStyle: { color: "white" },
              textColor: "#018773",
              primaryColor: "#018773",
              fontSize: 20,
            }}
            withFilter
            onSelect={handleCountrySelect}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </KeyboardAvoidingView>

      <View>
        <Text style={styles.header_text}>Payment Method</Text>
       <View  style={{borderColor:"#01877e",borderWidth:1,margin:10,borderRadius:10,width:"80%",alignSelf:"center"
      
      }}>
       <View style={styles.small_container2}>
          <Text style={styles.text_style2}>PayPal</Text>
          <Pressable style={styles.button_style}
          onPress={book_place}
          >
            <Image
              style={styles.image_style}
              source={require("../assets/paypal.png")}
            ></Image>
          </Pressable>
        </View>
        <View style={styles.small_container2}>
          <Text style={styles.text_style2}>Credit Card</Text>
         
        </View>
        <View style={styles.small_container3}><Pressable style={styles.button_style}>
            <Image
              style={styles.image_style}
              source={require("../assets/visa.jpeg")}
            ></Image>
          </Pressable>
          <Pressable style={styles.button_style}>
            <Image
              style={styles.image_style}
              source={require("../assets/jazzcash.png")}
            ></Image>
          </Pressable>
        </View>
       </View>
      </View>

     <View   style={{flexDirection:"row"  ,justifyContent:"space-between"}}>
     <Text style={styles.header_text}>Total</Text>
      <Text style={styles.header_text}>Rs {cart_price}</Text>
     </View>
    <View
    style={styles.small_container2}
    >
       <View style={styles.inner_container3}>
                    <Ionicons name="checkmark" size={30} color="#00FF00" />
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.text_style3}>Free Cancellation</Text>
                      <Text style={styles.text_style4}>
                        Until 12:00 AM one day before your tour
                      </Text>
                    </View>
                  </View>

                 
    </View>

       
    <View style={styles.inner_container2}>
                    <Text style={styles.text_style5}>
                      By continuing, you agree to our Terms of Use and Privacy and your activity provider's terms and conditions.
                      
                    </Text>
                  </View>

    </ScrollView>
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
    color: "#01877E",
    fontSize: 25,
    // fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Podkova",
    marginBottom: 15,
    marginRight: 95,
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
    margin: 2,
    alignSelf: "center",
    // marginTop: 90,
    width: "80%",
    height: 50,
    borderColor: "transparent",

    justifyContent: "center",

    borderWidth: 2,
  },
  small_container2: {
    flexDirection: "row",
    margin: 2,
    alignSelf: "center",
    justifyContent: "space-between",
    width: "80%",
    height: 50,
    alignItems: "center",
    borderColor: "transparent",

    borderWidth: 2,
  },
  small_container3: {
    flexDirection: "row",
    margin: 2,
    alignSelf: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    alignItems: "center",
    borderColor: "transparent",

    borderWidth: 2,
  },
  picker_container: {
    // flex:1,
    margin: 2,
    alignSelf: "center",
    // marginTop: 90,
    width: "80%",
    height: 40,
    borderColor: "transparent",
    color: "#01877e",

    justifyContent: "center",
    borderColor: "transparent",
    borderColor: "#01877E",
    marginTop: 13,
    marginBottom: 30,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  input_style: {
    width: "100%",
    height: 40,

    color: "#13313D",
    borderWidth: 1,
    // padding: 10,
    fontSize: 20,
    borderColor: "transparent",
    borderColor: "#01877E",
    marginTop: 13,
    paddingLeft: 10,
    borderRadius: 10,

    fontFamily: "Podkova",
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
    marginTop: 4,
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
    fontSize: 20,
    // fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Podkova",
  },
  text_style5: {
    color: "#01877E",
    fontSize: 12,
    // fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Podkova",
    marginBottom: 15,
    marginTop : 15,
  },

  button_style: {
    color: "#13313D",
    width: 90,
    height: 40,
    marginRight: 2,
    fontFamily: "Podkova",
    marginRight: 15,
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
    fontSize: 12,
    // fontWeight: "bold",
    // margin: 10,
    fontFamily: "Podkova",
    // marginTop: 5,
    paddingLeft: 15,
  },
  text_container: {
    width: "50%",
  },
  image_style: {
    // zIndex: 1,
    width: "100%",
    height: "100%",
    // margin: 10,
    resizeMode: "contain",
    alignSelf: "center",

    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#13313D",
    borderWidth: 2,
  },

  text_style2: {
    color: "#13313D",
    fontSize: 20,
    // fontWeight: "bold",
    margin: 10,
    marginRight: 2,
    fontFamily: "Podkova",
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
  price_style: {
    color: "red",
    fontSize: 23,
    marginTop: 5,
    marginLeft: 220,
    fontFamily: "Podkova",
  },
  inner_container3: { flexDirection: "row",
   alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    borderColor: "#13313D",
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    height: 50,
  
  
  },
});
