import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
// import { Routes } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar></NavBar>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
