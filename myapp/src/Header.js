// Header.js
import React from "react";
import logo from "./sis.jpeg";

const Header = ({ title }) => {
  return (
    <div style={{ display: "flex", textAlign: "center" }}>
      <img style={{ width: "100px", height: "100px" }} src={logo} alt="Logo" />
      <h1 style={{ marginLeft: "470px" }}>{title}</h1>
    </div>
  );
};

export default Header;
