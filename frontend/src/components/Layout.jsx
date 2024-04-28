import React, { useContext } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
// import { Routes } from "react-router-dom";
import UserContext from "../context/user";

const Layout = ({ children }) => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <NavBar></NavBar>
      <div style={{ display: "flex" }}>
        {/* only shows sidebar if user is logged in */}
        {!userCtx.accessToken ? "" : <SideBar></SideBar>}
        <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
