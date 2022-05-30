import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ResponsiveNavBar from "../MaterialDesign/ResponsiveNavBar";
import hotelImg from "../../Assets/Images/hotel.jpg";
import BASE_URI from "../../core";
import axios from "axios";
import { useParams } from "react-router-dom";

const CurrentHotel = () => {
  const [currentHotel, setCurrentHotel] = useState([]);
  let params = useParams();
  useEffect(() => {
    let hotel = async () => {
      await axios
        .get(`${BASE_URI}user/hotel?hotelid=${params.hotelName}`)
        .then((res) => {
          let data = res.data;
          if (data.length === 0) {
            setCurrentHotel("");
          } else {
            setCurrentHotel(data);
          }
        })
        .catch((err) => console.log(err));
    };
    hotel()
  }, []);
  return (
    <>
      <ResponsiveNavBar />
      <Container maxWidth="lg">
        {/* <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ marginTop: "30px", fontWeight: "bold" }}
        >
          Hotels
        </Typography> */}
        <div role="presentation" style={{ marginTop: "40px" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit">
              Hotels
            </Link>
            <Typography color="text.primary">
              {currentHotel.hotelName}
            </Typography>
          </Breadcrumbs>
        </div>
      </Container>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Card sx={{ width: 800, margin: "30px" }} id={currentHotel._id}>
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
                  maxWidth: 800,
                  bgcolor: "background.paper",
                }}
              >
                <Box sx={{ my: 3, mx: 2 }}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography gutterBottom variant="h4" component="div">
                        {currentHotel.hotelName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h6" component="div">
                        Rs{currentHotel.price}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography color="text.secondary" variant="body2">
                    {currentHotel.desc}
                  </Typography>
                </Box>
                <Divider variant="middle" />
                <Box sx={{ m: 2 }}>
                  <Typography gutterBottom variant="body1">
                    Services
                    <Typography color="text.secondary" variant="body2" mt="5px">
                      {currentHotel.services + ""}
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
      </Container>
    </>
  );
};

export default CurrentHotel;
