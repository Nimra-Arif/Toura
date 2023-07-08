

import React, { useState } from "react";

const TouraContext = React.createContext();

const TouraProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [places, setplaces] = useState([]);
  const [selectedplace, setselectedplace] = useState("");
  const [cartedplaces, setcartedplaces] = useState([]);
  const [bookedplaces, setbookedplaces] = useState([]);
  let [cartitems,setcart_items]=useState(0);


  return (
    <TouraContext.Provider value={{ userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces ,bookedplaces, setbookedplaces,
      cartitems,setcart_items
    }}>
      {props.children}
    </TouraContext.Provider>
  );
};

export { TouraProvider, TouraContext };