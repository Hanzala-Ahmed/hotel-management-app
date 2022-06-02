import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import logo from "../../Assets/Images/logo.png";
import { Link, useNavigate } from "react-router-dom";

// const pages = ["stays", "Flights", "Cra Rentals", "Attraction"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveNavBar = (props) => {
  console.log(props.profileBtn);
  const [anchorElNav, setAnchorElNav] = useState("");
  const [anchorElUser, setAnchorElUser] = useState("");
  const [user, setUser] = useState("");

  const localUser = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const profileHandler = () => {
    if (localUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localUserData = JSON.parse(localUser);
    if (localUserData) {
      setUser("user");
    }
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#023D3A" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
            }}
          >
            <img src={logo} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              {" "}
              Home
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {props.profileBtn ? localUser ? (
              <Button
                variant="contained"
                onClick={profileHandler}
                sx={{
                  backgroundColor: "white",
                  color: "#023D3A",
                  margin: "0px 10px",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#023D3A",
                    borderColor: "white",
                  },
                }}
              >
                Profile
              </Button>
            ) : (
              <Button
                variant="contained"
                href="/login"
                sx={{
                  backgroundColor: "white",
                  color: "#023D3A",
                  margin: "0px 10px",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#023D3A",
                    borderColor: "white",
                  },
                }}
              >
                Login
              </Button>
            ) : <></>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveNavBar;
