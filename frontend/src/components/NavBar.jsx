import React from "react";
import styles from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

// importing icons from MUI Icons
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
// import Login from "./Login";

const NavBar = () => {
  const handleLogout = () => {};

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
            {/* {!userCtx.accessToken ? (
              <button
              // className={styles.loginButton}
              // onClick={handleOpenLoginModal}
              >
                Login <LockOpenOutlinedIcon />
              </button>
            ) : (
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout <ExitToAppOutlinedIcon />
              </button>
            )} */}
          </li>
        </ul>
      </nav>
      {/*========== Render the Login component conditionally ==========*/}
      {/* {openLoginModal && <Login handleClose={handleCloseLoginModal} />} */}
    </header>
  );
};

export default NavBar;
