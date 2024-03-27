import React from "react";
import Header from "./Header";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
