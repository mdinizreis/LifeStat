import React, { useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

//importing MaterialUI components and icons
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { blueGrey } from "@mui/material/colors";

//Material UI theme to change/customize the button color
const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
});

const Login = ({ handleClose }) => {
  const fetchData = useFetch();

  //for login
  const userCtx = useContext(UserContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //for registration
  const [roles, setRoles] = useState([]);
  const [registrationUsername, setRegistrationUsername] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [registrationRole, setRegistrationRole] = useState(
    "user" //user role
  );

  //to control if Login or Registration screen show at the Modal
  const [showLogin, setShowLogin] = useState(true);

  //   get user roles (user, admin, etc)
  //   const getRoles = async () => {
  //     const res = await fetchData("/roles");
  //     if (res.ok) {
  //       setRoles(res.data);
  //     } else {
  //       console.log(res.data);
  //     }
  //   };

  //user registration
  const registerUser = async () => {
    const res = await fetchData("/register", "PUT", {
      user_username: registrationUsername,
      user_email: registrationEmail,
      user_hash: registrationPassword,
      user_role: registrationRole,
    });

    if (res.ok) {
      setRegistrationUsername("");
      setRegistrationEmail("");
      setRegistrationPassword("");
      setRegistrationRole("user");
      alert("Registered!");
      setShowLogin("true");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  //user login
  const loginUser = async () => {
    const res = await fetchData("/login", "POST", {
      user_email: loginEmail,
      user_hash: loginPassword,
    });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      userCtx.setLoggedUserId(res.data.id);
      const decoded = jwtDecode(res.data.access); //decode to get claims
      userCtx.setRole(decoded.user_role); //get role from claims
      handleClose(); //to close the modal after successful login
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (showLogin) {
      if (!loginEmail || !loginPassword) {
        alert("Please enter both email and password.");
        return;
      }
      loginUser(); //if login call the login endpoint
    } else if (!showLogin) {
      if (
        !registrationUsername ||
        !registrationEmail ||
        !registrationPassword
      ) {
        alert("Please fill out all registration fields.");
        return;
      }
      registerUser(); //if registration is truthy call the registration endpoint
    }
  };

  //   useEffect(() => {
  //     getRoles();
  //   }, []);

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 1,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {showLogin ? "Sign in" : "Sign up"}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                {showLogin ? (
                  /*========================  LOGIN SCREEN ======================== */
                  <Grid>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="loginEmail"
                      label="Email Address"
                      name="loginEmail"
                      autoComplete="email"
                      autoFocus
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="loginPassword"
                      label="Password"
                      type="password"
                      id="loginPassword"
                      autoComplete="current-password"
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={() => setShowLogin(false)}
                        >
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  /*========================  REGISTRATION SCREEN ======================== */
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="username"
                        name="registrationUsername"
                        required
                        fullWidth
                        id="registrationUsername"
                        label="Username"
                        autoFocus
                        onChange={(e) =>
                          setRegistrationUsername(e.target.value)
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="registrationEmail"
                        label="Email Address"
                        name="registrationEmail"
                        autoComplete="email"
                        onChange={(e) => setRegistrationEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="registrationPassword"
                        label="Password"
                        type="password"
                        id="registrationPassword"
                        autoComplete="new-password"
                        onChange={(e) =>
                          setRegistrationPassword(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={() => setShowLogin(true)}
                        >
                          {"Already have an account? Sign in"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {/*========================  SUBMIT BUTTON ========================*/}
                <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {showLogin ? "Sign In" : "Sign Up"}
                  </Button>
                </ThemeProvider>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default Login;
