
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
  Button,
} from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import { sending_data } from "./signup_page1";
import { ScrollView } from "react-native";

import { collection, addDoc, setDoc, doc,updateDoc } from "firebase/firestore";
import { query, where, getDocs, deleteDoc } from "firebase/firestore";
import { TouraProvider, TouraContext } from "../Global/TouraContext";
import { db } from "./config.jsx";
import { storage } from "./config.jsx";
import { useState, useEffect, useContext,useLayoutEffect } from "react";
import DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
async function loadFonts() {
  Font.loadAsync({
    Podkova: require("../assets/fonts/Podkova.ttf"),
    Playball: require("../assets/fonts/Playball.ttf"),
    // Add other custom fonts here if needed
  });
}
export default function Profile({ navigation }) {
  const [username, setusername] = useState("");
  const { userId, setUserId, places, setplaces} = useContext(TouraContext);
  const [profimg,setprofimg]=useState("");



  
  const uploadImage = async (img) => {
    console.log("uploadImage");
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", img, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: "image/jpeg" || "image/png",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "user/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          console.log("File available at", downloadURL);
          setprofimg(downloadURL);
          console.log("profimg",profimg)

      
          const q1 = query(collection(db, "users"), where("uid", "==", userId));
          getDocs(q1).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.data().profile_pic=downloadURL;
              updateDoc(doc.ref, {profile_pic:downloadURL})
            })
          })
        })
      
      }
    );
  };

  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let profileName = doc.data().username;
        setusername(profileName);
        let profilePic = doc.data().profile_pic;
        setprofimg(profilePic);

       
       
      });
    });
    loadFonts();
  
  }, []);
  const [image, setImage] = useState(null);
const [data,setData]=useState([])
 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("result", result.uri);
      setImage(result.uri);
      console.log("result", result.uri);
      console.log("image", image);
      console.log("image", image);
      uploadImage(result.uri);
    }
  };



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
          Profile
        </Text>
      </View>
      <ScrollView style={styles.large_container}>
        <ImageBackground
          // source={require("../assets/profile_pic.png")}
          style={styles.background_image_style}
        >
          <View style={styles.inner_container}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // marginTop: 20,
              }}
            >
              {profimg && (
                <View
                  style={{
                    width: 120,
                    height: 120,
                   
                    borderRadius: 100,
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: profimg }}
                    style={{
                      width: 120,
                      height: 120,
                     
                      borderRadius: 100,
                    }}
                  />
                </View>
              )}
              {!profimg && (
                <View
                  style={{
                    width: 120,
                    height: 120,
                  
                    borderRadius: 100,
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../assets/profile_pic3.png")}
                    style={{
                      width: 120,
                      height: 120,

                      borderRadius: 100,
                    }}
                  />
                </View>

              )}
              <Pressable
                style={{
                  marginTop: -30,
                  marginLeft: 80,
                }}
                onPress={pickImage}
              >
                <Ionicons name="camera" size={39} color="#Ecf9" />
              </Pressable>
            </View>
            <View style={
              {
                alignItems: "center",
                justifyContent: "center",
                // margin: 20,
                marginTop: 20,
                marginBottom: 20,
              }
            }>
              <Text style={styles.header_text1}>
             
                {username}
          
                
              </Text>

            </View>


            <View style={styles.inner_container2}>
              <Ionicons name="person" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Edit Profile</Text>
              </Pressable>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="wallet" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Currency</Text>
                <Ionicons name="caret-down" size={24} color="white" />
              </Pressable>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="wallet" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Notifications</Text>
                <Ionicons name="toggle" size={29} color="white" />
              </Pressable>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="chatbox-ellipses" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Leave feedback</Text>
              </Pressable>
            </View>
            <View style={styles.inner_container2}>
              <Ionicons name="book" size={24} color="white" />
              <Pressable style={styles.pressable_style}>
                <Text style={styles.text_style}>Privacy Policy </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
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
    // alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  header_text: {
    color: "white",
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily: "Podkova",
    marginLeft: 10,
  },
  header_text1: {
    color: "white",
    fontSize: 33,
    // fontWeight: "bold",
    fontFamily: "Podkova",
   
  },
  large_container: {
    flex: 1,
    marginTop: 90,
    backgroundColor: "#01877E",
    opacity: 0.8,
  },
  background_image_style: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  inner_container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  inner_container1: {
    justifyContent: "center",
    alignItems: "center",
    // margin: 30,
  },
  inner_container2: {
    width: "60%",
    height: 34,
    // justifyContent: "center",
    borderColor: "transparent",
    borderBottomColor: "white",
    borderWidth: 1,
    marginTop: 20,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  text_style: {
    color: "white",
    fontSize: 22,
    // fontWeight: "bold",
    margin: 2,
    fontFamily: "Podkova",
    // marginRight: 100,
  },

  pressable_style: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
