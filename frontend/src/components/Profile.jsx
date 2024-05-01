//Purpose: Retrieve user information from DB and allow them to edit and update
//is called from Account.jsx page

import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import {
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [updatedInfo, setUpdatedInfo] = useState({
    user_username: "",
    user_email: "",
    user_hash: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user_id = userCtx.loggedUserId;
        const res = await fetchData(
          "/users/" + user_id,
          "GET",
          undefined,
          userCtx.accessToken
        );

        if (res.ok) {
          setUpdatedInfo(res.data.data);
        } else {
          alert(JSON.stringify(res.data));
          console.log(res.data);
        }
      } catch (error) {
        console.error("Error retrieving user information:", error);
        // Handle error scenario here
      }
    };

    getUserInfo();
  }, []);

  const handleUpdate = async () => {
    // Check if the password field is empty
    if (!updatedInfo.user_hash.trim()) {
      setPasswordError(true);
      return; // Stop the update process
    }
    //updateUser
    try {
      const user_id = userCtx.loggedUserId;
      const res = await fetchData(
        "/update/" + user_id,
        "PATCH",
        updatedInfo,
        userCtx.accessToken
      );

      if (res.ok) {
        console.log("User information updated successfully");
        alert("Succefully updated!");
      } else {
        alert("Failed to update user information");
        console.error(res.data);
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo({
      ...updatedInfo,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      {updatedInfo && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="user_username"
              value={updatedInfo.user_username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="user_email"
              value={updatedInfo.user_email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Password"
              name="user_hash"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              onChange={handleChange}
              helperText={passwordError ? "Password cannot be empty" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Profile;
