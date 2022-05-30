import React, { useState, useEffect } from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { toast, ToastContainer } from "react-toastify";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../Assets/Images/logoColor.png";
import { useDispatch, useSelector } from "react-redux";
import { SignupAction } from "../../Store/Actions/authAction";
import { useNavigate } from "react-router-dom";

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  const {
    userData,
    userDataLoading,
    userDataError,
    userDataMessage,
    isSignupError,
  } = useSelector((state) => state.SignupReducer);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !role
    ) {
      toast.error("required fields are empty");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.error("invalid email");
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
      toast.error("weak password");
      return;
    }
    const userObj = {
      userName: `${firstName} ${lastName}`,
      email: email,
      password: password,
      contact: phoneNumber,
      role: role,
    };
    try {
      await dispatch(SignupAction(userObj));
    } catch (error) {
      console.log(error, "error component");
    }
    // toast.success("Successfully Loggin")
    // console.log(firstName);
    // console.log(lastName);
    // console.log(phoneNumber);
    // console.log(email);
    // console.log(password);
    // console.log(role);
    // console.log(userData);
    // console.log(userDataLoading);
    // console.log(userDataMessage);
    // console.log(userDataError);
    // console.log(userObj);
  };
  // toast.success("userData")
  useEffect(() => {
    if (userData && !isSignupError) {
      console.log("userData inCondition", userData);
      toast.success(userData?.message);
      console.log(userData.data.role);
      if(userData.data.role === "user"){
      navigate("/", { replace: true })
      // return
      }
      if(userData.data.role === "admin"){
      navigate("/hotelAdmin", { replace: true })
      // return
      }
    } else if (isSignupError) {
      console.log("userData erorr", userDataError);
      toast.error(userDataError);
    }
    // return ()=>toast.success(userData?.message)
  }, [userData, isSignupError]);
  const firstNameHandle = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameHandle = (e) => {
    setlastName(e.target.value);
  };
  const numberHandle = (e) => {
    setphoneNumber(e.target.value);
  };
  const emailHandle = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandle = (e) => {
    setpassword(e.target.value);
  };
  const roleHandle = (e) => {
    if (e.target.checked) {
      setRole("admin");
    } else {
      setRole("user");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <ToastContainer /> */}
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 4 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={firstNameHandle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="Last-Name"
                  onChange={lastNameHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  draggable={false}
                  label="Contact Number"
                  name="number"
                  type="number"
                  inputProps={{ maxLength: 12 }}
                  onChange={numberHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={emailHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText="password must have 6-20 words and must be included one Uppercase letter, number, character"
                  onChange={passwordHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="user" color="primary" />}
                  label="Signup as admin"
                  onChange={roleHandle}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
