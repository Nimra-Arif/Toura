

import React, { useState } from "react";

const TouraContext = React.createContext();

const TouraProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [places, setplaces] = useState([]);
  const [Wishlistplace, setWishlistplace] = useState([]);
  const [selectedplace, setselectedplace] = useState("");
  const [cartedplaces, setcartedplaces] = useState([]);
  const [bookedplaces, setbookedplaces] = useState([]);

  let [cartitems,setcart_items]=useState(0);
  const [placetype, setplacetype] = useState("");



  return (
    <TouraContext.Provider value={
      { userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces ,bookedplaces, setbookedplaces,placetype, setplacetype,
      cartitems,setcart_items,Wishlistplace,setWishlistplace
    }
    }>
      {props.children}
    </TouraContext.Provider>
  );
};

export { TouraProvider, TouraContext };