import React, { useState, useContext } from "react";
import styles from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/user";

// importing icons from MUI Icons
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Login from "./Login";

const NavBar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleLogout = () => {
    // Clear user context or any stored tokens or session data
    userCtx.setAccessToken(null);
    // userCtx.setRole(null);
    // userCtx.setLoggedUserId(null);
    navigate("/Main");
  };

  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              <img
                src="/src/assets/lifeStat_brand.png"
                width="192"
                height="35"
                className="d-inline-block align-top"
                alt=""
              ></img>
            </NavLink>
          </li>
          <li
            style={{
              marginLeft: "auto",
              marginRight: "2rem",
            }}
          >
            {!userCtx.accessToken ? (
              <button
                className={styles.loginButton}
                onClick={handleOpenLoginModal}
              >
                Login <LockOpenOutlinedIcon />
              </button>
            ) : (
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout <ExitToAppOutlinedIcon />
              </button>
            )}
          </li>
        </ul>
      </nav>
      {/*========== Render the Login component conditionally ==========*/}
      {openLoginModal && <Login handleClose={handleCloseLoginModal} />}
    </header>
  );
};

export default NavBar;
