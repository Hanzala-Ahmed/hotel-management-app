import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../Assets/Images/logoColor.png";
// import Switch from "@mui/material/Switch";
// import { FormControlLabel } from "@mui/material";
import { LoginAction } from "../../Store/Actions/authAction";

const theme = createTheme();

export default function SignIn() {
  const [userObj, setUserObj] = useState({});

  const dispatch = useDispatch();
  const { userData, userDataLoading, userDataError, userDataMessage } =
    useSelector((state) => state.LoginReducer);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userObj = {
      email: data.get("email"),
      password: data.get("password"),
    };
    await setUserObj(userObj);
    if (userObj.email && userObj.password) {
      console.log(userObj);
      dispatch(LoginAction(userObj));
      // alert("invalid user");
    } else {
      toast.error("fields are empty");
    }
    // if (user === "admin") {
    //   navigate("/hotelAdmin", { replace: true });
    // }
  };

  const datalocal = localStorage.getItem("user");
  const localUserData = JSON.parse(datalocal);

  // console.log(localUserData);

  useEffect(() => {
    console.log(userDataError);
    if (userDataError) {
      toast.error(userDataError);
    }
  }, [userDataError, userObj]);

  useEffect(() => {
    console.log(userDataMessage);
    console.log(localUserData);
    if (localUserData) {
      // console.log(localUserData._id);
      if (localUserData.role === "admin") {
        navigate("/hotelAdmin", { replace: true });
        console.log("admin");
      }
      if (localUserData.role === "user") {
        console.log("user");
        navigate("/", { replace: true });
      }
    }
    if (userDataMessage) {
      toast.success(userDataMessage);
      console.log(userData.role);
      if (userData.role === "user") {
        navigate("/", { replace: true });
      }
      if (userData.role === "admin") {
        navigate("/hotelAdmin", { replace: true });
      }
    }
  }, [userDataMessage, userData]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ marginBottom: "20px" }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {userDataLoading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  cursor: "none",
                  backgroundColor: "rgb(232, 240, 254",
                }}
              >
                loading...
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
