

import React, { useState } from "react";

const TouraContext = React.createContext();

const TouraProvider = (props) => {
  const [userId, setUserId] = useState("");

  return (
    <TouraContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </TouraContext.Provider>
  );
};

export { TouraProvider, TouraContext };