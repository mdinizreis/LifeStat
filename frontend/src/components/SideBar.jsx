import React, { useState, useContext, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "./SideBar.module.css";
// import UserContext from "../context/user";
// import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

// importing icons from MUI Icons
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const userCtx = useContext(UserContext);
  // const fetchData = useFetch();

  // const navigate = useNavigate();

  //   useEffect(() => {
  //     getCollectionByUserID();
  //   }, [userCtx.loggedUserId]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  //   const handleMenuItemClick = (menuItem) => {
  //     let searchParams = {};

  //     switch (menuItem) {
  //       case "Finance":
  //         searchParams = {
  //           q: "Finance",
  //           category: "Finance",
  //         };
  //         break;
  //       case "Sports":
  //         searchParams = {
  //           q: "Sports",
  //           category: "Sports",
  //         };
  //         break;
  //       case "Business":
  //         searchParams = {
  //           q: "Business",
  //           category: "Business",
  //         };
  //         break;
  //       case "Politics":
  //         searchParams = {
  //           q: "Politics",
  //           category: "Politics",
  //         };
  //         break;
  //       case "Tech":
  //         searchParams = {
  //           q: "Tech",
  //           category: "Tech",
  //         };
  //         break;
  //       case "Entertainment":
  //         searchParams = {
  //           q: "Entertainment",
  //           category: "Entertainment",
  //         };
  //         break;
  //     }
  //     // Pass the search parameters state to the Main page
  //     navigate("/Main", { state: { searchParams } });
  //   };

  //   const handleFeedMenuItemClick = (feedMenuItem) => {
  //     let searchParams = {};
  //     searchParams = {
  //       q: feedMenuItem,
  //     };
  //     // Pass the search parameters state to the Main page
  //     navigate("/Feed", { state: { searchParams } });
  //   };

  return (
    <Sidebar
      className={styles.sidebar}
      collapsed={collapsed}
      onToggle={toggleSidebar}
    >
      <Menu>
        {/* <img src="/src/assets/lifeStat_logo.png"></img> */}
        <MenuItem
          icon={collapsed ? <MenuOutlinedIcon /> : <MenuOpenOutlinedIcon />}
          onClick={() => {
            toggleSidebar();
          }}
        ></MenuItem>
        {!collapsed && (
          <MenuItem>
            <p className={styles.sidebar}>Top Articles</p>
          </MenuItem>
        )}

        <MenuItem
          icon={<AttachMoneyOutlinedIcon />}
          onClick={() => handleMenuItemClick("Finance")}
        >
          {" "}
          Finance
        </MenuItem>
        <MenuItem
          icon={<DirectionsRunOutlinedIcon />}
          onClick={() => handleMenuItemClick("Sports")}
        >
          {" "}
          Sports
        </MenuItem>
        <MenuItem
          icon={<WorkOutlineOutlinedIcon />}
          onClick={() => handleMenuItemClick("Business")}
        >
          {" "}
          Business
        </MenuItem>
        <MenuItem
          icon={<AccountBalanceOutlinedIcon />}
          onClick={() => handleMenuItemClick("Politics")}
        >
          {" "}
          Politics
        </MenuItem>
        <MenuItem
          icon={<MemoryOutlinedIcon />}
          onClick={() => handleMenuItemClick("Tech")}
        >
          {" "}
          Tech
        </MenuItem>
        <MenuItem
          icon={<AttractionsOutlinedIcon />}
          onClick={() => handleMenuItemClick("Entertainment")}
        >
          {" "}
          Entertainment
        </MenuItem>

        <br />
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
