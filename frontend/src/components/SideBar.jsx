import React, { useState, useContext, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "./SideBar.module.css";
import UserContext from "../context/user";
// import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

// importing icons from MUI Icons
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DirectionsRunOutlinedIcon from "@mui/icons-material/DirectionsRunOutlined";
import HotelIcon from "@mui/icons-material/Hotel";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userCtx = useContext(UserContext);

  // const fetchData = useFetch();

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (menuItem) => {
    let searchParams = {};

    switch (menuItem) {
      case "day":
        navigate("/main");
        break;
      case "week":
        searchParams = {
          q: "Week",
          category: "Week",
        };
        break;
      case "month":
        searchParams = {
          q: "Month",
          category: "Month",
        };
        break;
      case "activity":
        searchParams = {
          q: "Activity",
          category: "Activity",
        };
        break;
      case "sleep":
        searchParams = {
          q: "Sleep",
          category: "Sleep",
        };
        break;
      case "health":
        searchParams = {
          q: "Health & Body",
          category: "Health & Body",
        };
        break;
      case "account":
        navigate("/account");
        break;
      case "connected":
        searchParams = {
          q: "Connected Services",
          category: "Connected Services",
        };
        break;
      default:
        // Handle default case
        break;
    }

    // Pass the search parameters state to the Main page
    // navigate("/Main", { state: { searchParams } });
  };

  const handleAdminMenuItemClick = () => {
    navigate("/admin");
  };

  return (
    <Sidebar
      className={styles.sidebar}
      collapsed={collapsed}
      onToggle={toggleSidebar}
    >
      <Menu>
        <MenuItem
          icon={collapsed ? <MenuOutlinedIcon /> : <MenuOpenOutlinedIcon />}
          onClick={() => {
            toggleSidebar();
          }}
        ></MenuItem>
        {!collapsed && (
          <MenuItem>
            <p className={styles.sidebar}>DASHBOARD</p>
          </MenuItem>
        )}

        <MenuItem
          icon={<TodayIcon />}
          onClick={() => handleMenuItemClick("day")}
        >
          {" "}
          Day
        </MenuItem>
        <MenuItem
          icon={<DateRangeIcon />}
          onClick={() => handleMenuItemClick("week")}
        >
          {" "}
          Week
        </MenuItem>
        <MenuItem
          icon={<CalendarMonthIcon />}
          onClick={() => handleMenuItemClick("month")}
        >
          {" "}
          Month
        </MenuItem>
        {!collapsed && (
          <MenuItem>
            <p className={styles.sidebar}>REVIEW</p>
          </MenuItem>
        )}
        {!collapsed && (
          <MenuItem>
            <p className={styles.sidebar}>DATA</p>
          </MenuItem>
        )}
        <MenuItem
          icon={<DirectionsRunOutlinedIcon />}
          onClick={() => handleMenuItemClick("activity")}
        >
          {" "}
          Activity
        </MenuItem>
        <MenuItem
          icon={<HotelIcon />}
          onClick={() => handleMenuItemClick("sleep")}
        >
          {" "}
          Sleep
        </MenuItem>
        <MenuItem
          icon={<MonitorHeartIcon />}
          onClick={() => handleMenuItemClick("health")}
        >
          {" "}
          Health & Body
        </MenuItem>
        {!collapsed && (
          <MenuItem>
            <p className={styles.sidebar}>{userCtx.userUsername}</p>
          </MenuItem>
        )}
        <MenuItem
          icon={<ManageAccountsIcon />}
          onClick={() => handleMenuItemClick("account")}
        >
          {" "}
          Account
        </MenuItem>
        <MenuItem
          icon={<AddCircleOutlineIcon />}
          onClick={() => handleMenuItemClick("connected")}
        >
          {" "}
          Connected Services
        </MenuItem>

        {!collapsed && userCtx.userRole === "admin" && (
          <MenuItem>
            <p className={styles.sidebar}>Admin Stuff</p>
          </MenuItem>
        )}
        {userCtx.userRole === "admin" && (
          <MenuItem
            icon={<AdminPanelSettingsIcon />}
            onClick={() => handleAdminMenuItemClick()}
          >
            {" "}
            Manage Users
          </MenuItem>
        )}
        <br />
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
