import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { Typography, Grid, Box, Button } from "@mui/material";
import FormatDate from "../utils/FormatDate";

const ManageUsers = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [usersList, setUsersList] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await fetchData(
        "/allUsers/",
        "GET",
        undefined,
        userCtx.accessToken
      );

      if (res.ok) {
        setUsersList(res.data);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error retrieving user information:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUpdate = (userId) => {
    console.log("Update user with ID:", userId);
    //Open Modal and handle user update here!!!
  };

  const handleDelete = async (userId) => {
    try {
      const user_id = userId;
      const res = await fetchData(
        "/delete/" + user_id,
        "DELETE",
        undefined,
        userCtx.accessToken
      );

      if (res.ok) {
        console.log("User deleted successfully");
        alert("User deleted!");
        // Refresh the user list
        getAllUsers();
      } else {
        alert("Failed to delete user");
        console.error(res.data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" fontWeight="bold">
            <Box width="20%">
              <Typography variant="subtitle1">Username</Typography>
            </Box>
            <Box width="20%">
              <Typography variant="subtitle1">Email</Typography>
            </Box>
            <Box width="20%">
              <Typography variant="subtitle1">Role</Typography>
            </Box>
            <Box width="20%">
              <Typography variant="subtitle1">Join Date</Typography>
            </Box>
            <Box width="20%" display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">Actions</Typography>
            </Box>
          </Box>
        </Grid>
        {usersList.map((user) => (
          <Grid
            item
            xs={12}
            key={user.user_id}
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <Box display="flex" alignItems="center">
              <Box width="20%">
                <Typography>{user.user_username}</Typography>
              </Box>
              <Box width="20%">
                <Typography>{user.user_email}</Typography>
              </Box>
              <Box width="20%">
                <Typography>{user.user_role}</Typography>
              </Box>
              <Box width="20%">
                <Typography>
                  {/* {user.user_join_date} */}
                  <FormatDate ISOdate={user.user_join_date} />
                </Typography>
              </Box>
              <Box width="20%" display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={() => handleUpdate(user.user_id)}
                  style={{ marginLeft: "10px" }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(user.user_id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ManageUsers;
