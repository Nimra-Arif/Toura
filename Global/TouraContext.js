

import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { query, where, getDocs, deleteDoc, copyDoc } from "firebase/firestore";
import { db } from "../components/config";
import React, { useState ,useEffect
} from "react";

const TouraContext = React.createContext();

const TouraProvider = (props) => {
  const [userId, setUserId] = useState("");
 
  const [places, setplaces] = useState([]);
  const [Wishlistplace, setWishlistplace] = useState(
    []
  );
  const [selectedplace, setselectedplace] = useState("");
  const [cartedplaces, setcartedplaces] = useState(
    []
  );
  const [bookedplaces, setbookedplaces] = useState([]);
  const [activitiesid, setactivitiesid] = useState([]);
  const [Recommendedplaces, setRecommendedplaces] = useState([]);
  const [topplaces, settopplaces] = useState([]);

  let [cartitems,setcart_items]=useState(0);
  const [placetype, setplacetype] = useState("");


    // const q = query(collection(db, "users"), where("uid", "==", userId));
    // const querySnapshot = getDocs(q);
    // querySnapshot.then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     setWishlistplace(doc.data().Wishlist);
    //     setcartedplaces(doc.data().cartlist);
    //     setbookedplaces(doc.data().bookedlist);
       

    //    doc.data().Wishlist=Wishlistplace;
    //     doc.data().cartlist=cartedplaces;
    //     doc.data().bookedlist=bookedplaces;
    //     updateDoc(doc.ref, {Wishlistplace:Wishlistplace})
    //     updateDoc(doc.ref, {cartedplaces:cartedplaces})
    //     updateDoc(doc.ref, {bookedplaces:bookedplaces})
    //     updateDoc(doc.ref, {
    //       Wishlist: Wishlistplace,  
    //       cartlist: cartedplaces,
    //       bookedlist: bookedplaces,
      //   });
      // });

  



  return (
    <TouraContext.Provider value={
      { userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces ,bookedplaces, setbookedplaces,placetype, setplacetype,
      cartitems,setcart_items,Wishlistplace,setWishlistplace,activitiesid,setactivitiesid,Recommendedplaces,setRecommendedplaces,
      topplaces,settopplaces
    }
    }>
      {props.children}
    </TouraContext.Provider>
  );
};

export { TouraProvider, TouraContext };