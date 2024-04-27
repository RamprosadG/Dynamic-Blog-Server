import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   //getUserInfo();
  // }, []);

  // const getUserInfo = () => {
  //   try {
  //     axios.get("http://localhost:5000/getUserInfo").then((response) => {
  //       if (response.success) {
  //         setIsLoggedIn(true);
  //         setUserInfo({ userName: "Ram" });
  //       }
  //     });
  //   } catch (error) {
  //     console.log("There is an error to authenticate");
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
