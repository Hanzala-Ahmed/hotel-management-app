import React, { useEffect, useState } from "react";
import ResponsiveNavBar from "../MaterialDesign/ResponsiveNavBar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import styles from "./HomePage.module.css";
import axios from "axios";
import BASE_URI from "../../core";
import { Chip, Container, Divider, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import hotelImg from "../../Assets/Images/hotel.jpg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const prices = [
    {
      value: "low to high",
      label: "low to high",
    },
    {
      value: "high to low",
      label: "high to low",
    },
  ];
  const rooms = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "6",
      label: "6",
    },
  ];

  const services = [
    {
      value: "Free Service",
      label: "Free Service",
    },
    {
      value: "Room service",
      label: "Room service",
    },
    {
      value: "Car rental services",
      label: "Car rental services",
    },
    {
      value: "Catering services",
      label: "Catering services",
    },
    {
      value: "Concierge services",
      label: "Concierge services",
    },
    {
      value: "Courier services",
      label: "Courier services",
    },
    {
      value: "Doctor on call",
      label: "Doctor on call",
    },
    {
      value: "Dry cleaning",
      label: "Dry cleaning",
    },
    {
      value: "Excursions and guided tours",
      label: "Excursions and guided tours",
    },
    {
      value: "Flower arrangement",
      label: "Flower arrangement",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [room, setRoom] = useState("");
  const [service, setService] = useState("");
  const [allHotel, setAllHotel] = useState([]);
  const [currentHotel, setCurrentHote] = useState([]);

  const navigate = useNavigate();

  const currencyHandleChange = (event) => {
    setCurrency(event.target.value);
  };
  const roomHandleChange = (event) => {
    setRoom(event.target.value);
  };
  const serviceHandleChange = (event) => {
    setService(event.target.value);
  };

  const searchObj =
    currency && room && service
      ? {
          prices: currency,
          room: room,
          service: service,
        }
      : {};

  const searchHandler = async () => {
    setLoading(true)
    if (currency && room && service) {
      await axios
        .get(
          `${BASE_URI}user/hotel?price=${searchObj.prices}&rooms=${searchObj.room}&service=${searchObj.service}`
        )
        .then((res) => {
          let data = res.data
          console.log("data");
          if (data.length === 0) {
            setAllHotel("");
            setLoading(false)
          } else {
            setAllHotel(data);
            setLoading(false)
          }
          console.log("data", data);
        })
        .catch((err) => console.log(err));
      console.log(Object.values(searchObj));
      setCurrency("");
      setRoom("");
      setService("");
    } else {
      toast.error("please select fields");
    }
  };

  const localUser = localStorage.getItem("user");

  const currentHotelHandle = async (e) => {
    if (!localUser) {
      toast.error("you need to sign in to see to hotel");
      navigate("/login");
    } else {
      const id = e.currentTarget.getAttribute("id");
      console.log(id);
      navigate(`/hotel/${id}`);
    }
  };

  useEffect(() => {
    setLoading(true)
    const getAllHotel = async () => {
      await axios
      .get(`${BASE_URI}user/hotel`)
      .then((res) => {
        let data = res.data;
        setAllHotel(data);
        console.log("er", data);
        setLoading(false)
        })
        .catch((err) => console.log(err));
    };
    getAllHotel();
  }, []);

  return (
    <>
      <ResponsiveNavBar />
      <div className={styles.sliderBox}>
        <div className={styles.serachBox}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch", outline: "none" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Price"
                value={currency}
                onChange={currencyHandleChange}
              >
                {prices.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ border: "1px solid white" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="Rooms"
                value={room}
                onChange={roomHandleChange}
              >
                {rooms.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ border: "1px solid white" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="Service"
                value={service}
                onChange={serviceHandleChange}
                sx={{ color: "white" }}
              >
                {services.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ border: "1px solid white" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                onClick={searchHandler}
                sx={{
                  backgroundColor: "white",
                  color: "#023D3A",

                  mr: 2,
                  mb: "auto",
                  mt: "auto",
                  ml: 5,
                  pr: 5,
                  pl: 5,
                  width: "60px",
                  "&:hover": {
                    backgroundColor: "#023D3A",
                    color: "white",
                    borderColor: "white",
                  },
                }}
              >
                Search
              </Button>
            </div>
          </Box>
        </div>
      </div>
      <Container maxWidth="lg">
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ marginTop: "30px", fontWeight: "bold" }}
        >
          Hotels
        </Typography>
      </Container>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {loading?(<span>loading...</span>):(<></>)}
        {allHotel ? (
          allHotel.map((val, ind) => {
            return (
              <Card
                sx={{ width: 345, margin: "30px" }}
                key={ind}
                id={val._id}
                onClick={currentHotelHandle}
              >
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
                              {val.hotelName}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              Rs{val.price}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography color="text.secondary" variant="body2">
                          {val.desc}
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
                            {val.services + ""}
                          </Typography>
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                        <Button>Book Now</Button>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })
        ) : (
          <span>No Product Found!</span>
        )}
      </Container>
    </>
  );
};

export default HomePage;
