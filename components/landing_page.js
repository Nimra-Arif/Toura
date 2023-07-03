import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const LaunchScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Starting Page");
    }, 3000);
  }, []);

  return (
    <View  style={{backgroundColor:"#01877e",
    flex: 1,
    }}>
      <Animatable.View
        animation="bounceIn"
        iterationCount={1}
        duration={1500}
        delay={100}
        style={styles.container}
      >
        <Animatable.Image
        source={require("../assets/logo_toura.png")}
        style={styles.image_style}
    
        />
        <Animatable.Text
          style={styles.text_style}
        >
          Toura
        </Animatable.Text>
        <Animatable.Text style={styles.slogan_style} numberOfLines={1}>
          Embrace the Journey, Embrace the World
        </Animatable.Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
        backgroundColor: "#01877E",
        alignItems: "center",

    },
    text_style: {
        fontSize: 45,
        fontWeight: "bold",
        color: "white",
marginTop: -60,


    },
    slogan_style: {
        color: "white",
        fontSize: 15,
        fontFamily: "Roboto",

      },
        image_style:{
            width: 200, height: 180, marginTop: 100,
                resizeMode: "contain" ,alignSelf:"center" , marginLeft: 10,
                
        },
  });
  

export default LaunchScreen;

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet } from "react-native";

// import React, { useEffect } from "react";
// import { View, Image, Text } from "react-native";
// import * as Animatable from "react-native-animatable";

// const LaunchScreen = ({ navigation }) => {
// //   useEffect(() => {
// //     setTimeout(() => {
// //       navigation.navigate("Starting Page");
// //     }, 3000);
// //   }, []);

//   return (
//     <View  style={{backgroundColor:"#01877e",
//     flex: 1,
//     }}>
//       <View
//         // animation="bounceIn"
//         // iterationCount={1}
//         // duration={1500}
//         // delay={100}
//         style={styles.container}
//       >
       
//         <Text
//           style={styles.text_style}
//         >
//           Toura
//         </Text>
//         <Animatable.Text style={styles.slogan_style} numberOfLines={1}>
//           Embrace the Journey, Embrace the World
//         </Animatable.Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//         backgroundColor: "#01877E",
//         alignItems: "center",
//         // justifyContent: "center",
//     },
//     text_style: {
//         fontSize: 45,
//         fontWeight: "bold",
//         color: "white",
//       marginTop: -60,
       
//         // textShadowColor: "black",
//         // textShadowOffset: { width: 4, height: 2 },
//         // textShadowRadius: 10,
//         // margin: 10,

//     },
//     slogan_style: {
//         color: "white",
//         fontSize: 15,
//         fontFamily: "Roboto",
//         // textShadowColor: "black",
//         // textShadowOffset: { width: 4, height: 2 },
//         // textShadowRadius: 10,
//       },
//   });
  

// export default LaunchScreen;