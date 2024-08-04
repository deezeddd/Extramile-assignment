import React, { useState } from "react";
import MyContext from "./Context";
import {jwtDecode} from "jwt-decode";
const MyProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
      const storedToken = localStorage.getItem("token");
      return storedToken || null;
    });
    const [userInfo, setUserInfo] = useState(() => {
      if(token){
        return jwtDecode(token);
      }
      else{
        return null;
      }
    })

  return (
    <MyContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
