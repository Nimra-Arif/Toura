

import React, { useState } from "react";

const TouraContext = React.createContext();

const TouraProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [places, setplaces] = useState([]);
  const [selectedplace, setselectedplace] = useState("");
  const [cartedplaces, setcartedplaces] = useState([]);


  return (
    <TouraContext.Provider value={{ userId, setUserId,places,setplaces,selectedplace,setselectedplace,cartedplaces,setcartedplaces }}>
      {props.children}
    </TouraContext.Provider>
  );
};

export { TouraProvider, TouraContext };