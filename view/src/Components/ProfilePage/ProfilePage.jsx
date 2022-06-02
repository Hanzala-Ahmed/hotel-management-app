import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ResponsiveNavBar from "../MaterialDesign/ResponsiveNavBar";
import hotelImg from "../../Assets/Images/hotel.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URI from "../../core";

const ProfilePage = () => {
  const localUser = localStorage.getItem("user");
  const localUserData = JSON.parse(localUser);
  const [bookedHotel, setBookedHotel] = useState("");

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!localUser) {
      navigate("/");
    } else {
      const getAllHotel = async () => {
        await axios
          .get(`${BASE_URI}user/hotel/book?userId=6291cd6ab31c294d732c43db`)
          .then((res) => {
            let data = res.data;
            setBookedHotel(data);
            console.log("data", data);
          })
          .catch((err) => console.log(err));
      };
      getAllHotel();
      console.log("hello");
    }
  }, []);

  return (
    <>
      <ResponsiveNavBar />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {/* <Card
          sx={{ width: 950, margin: "30px" }}
             key={ind}
             id={val._id}
             onClick={currentHotelHandle}
        > */}
        {/* <CardActionArea> */}
        {/* <CardMedia
              component="img"
              height="140"
            //   image={hotelImg}
              alt="green iguana"
            /> */}
        {/* <CardContent> */}
        <Box
          sx={{
            width: "80%",
            margin: "30px",
            //   maxWidth: 3,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div">
                  {/* {val.hotelName} */}
                  {localUserData ? localUserData.userName : null}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ flexWrap: "wrap" }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#023D3A",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#023D3A",
                        borderColor: "white",
                      },
                    }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary" variant="body2">
              <span style={{ fontWeight: "bold" }}>Contact Number: </span>
              {localUserData ? localUserData.contact : null}
            </Typography>
          </Box>
        </Box>
        <Box onClick={() => console.log("hello")}>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Booked Hotels</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Container
                maxWidth="xl"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Card sx={{ width: "100%", margin: "30px" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={hotelImg}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Box
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
                      >
                        <Box sx={{ my: 3, mx: 2 }}>
                          <Grid container alignItems="center">
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                              >
                                {/* {val.hotelName} */}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {/* Rs{val.price} */}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography color="text.secondary" variant="body2">
                            {/* {val.desc} */}
                          </Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ m: 2 }}>
                          <Typography gutterBottom variant="body1">
                            Services
                            <Typography
                              color="text.secondary"
                              variant="body2"
                              mt="5px"
                            >
                              {/* {val.services + ""} */}
                            </Typography>
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Container>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
