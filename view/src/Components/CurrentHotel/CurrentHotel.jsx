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
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ResponsiveNavBar from "../MaterialDesign/ResponsiveNavBar";
import hotelImg from "../../Assets/Images/hotel.jpg";
import BASE_URI from "../../core";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CurrentHotel = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentHotel, setCurrentHotel] = useState([]);
  const [bankName, setBankName] = useState("");
  const [creditNumber, setCreditNumber] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  let params = useParams();

  const bankNameHandle = (e) => {
    setBankName(e.target.value);
  };
  const creditNumHandle = (e) => {
    setCreditNumber(e.target.value);
  };
  const cardCodeHandle = (e) => {
    setCardCode(e.target.value);
  };
  const expiryDateHandle = (e) => {
    setExpiryDate(e.target.value);
  };

  const localUser = localStorage.getItem("user");
  const localUserParse = JSON.parse(localUser);
  const userId = localUserParse._id;

  const userObj = {
    userId: userId,
    hotelId: params.hotelName,
    hotel: [{hote: "hotels"}],
    bankName: bankName,
    creditCard: creditNumber,
    cardCode: cardCode,
    expiryDate: expiryDate,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bankName && !creditNumber && !cardCode && !expiryDate) {
      toast.error("Entire fields are empty");
    } else if (creditNumber.length < 16 && creditNumber.length > 16) {
      toast.error("enter proper card number");
    } else if (cardCode.length < 4 && creditNumber.length > 4) {
      toast.error("enter proper card code");
    } else if (!expiryDate) {
      toast.error("enter expiry date of your card");
    } else {
      console.log(userObj);
      await axios
        .post(`${BASE_URI}user/hotel/book`, userObj)
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "hotel successfully booked") {
            toast.success(res.data.message);
            setOpen(false);
          } else if (
            res.data.message === "you have already booked this hotel"
          ) {
            toast.error(res.data.message);
            setOpen(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

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
    hotel();
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
                  <Button onClick={handleOpen}>Book Now</Button>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            // right: "50%",
            // bottom: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            bgcolor: "background.paper",
            // border: "2px solid #023D3A",
            borderRadius: 4,
            boxShadow: 50,
            p: 4,
          }}
        >
          <Typography component="h1" variant="h5">
            Bank Details
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, mb: 4 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="bankName"
                  required
                  fullWidth
                  id="bankName"
                  label="Bank Name"
                  autoFocus
                  onChange={bankNameHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  draggable={false}
                  label="Credit Card Number"
                  name="creditCardNumber"
                  type="number"
                  inputProps={{ maxLength: 12 }}
                  onChange={creditNumHandle}
                  helperText="Credit card number must be equal to 16 number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="number"
                  draggable={false}
                  label="Card Code"
                  name="cardCode"
                  type="text"
                  inputProps={{ maxLength: 4 }}
                  onChange={cardCodeHandle}
                  helperText="code must have 4 numbers"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="date"
                  name="email"
                  type="date"
                  onChange={expiryDateHandle}
                  helperText="Expiry Date"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Book your hotel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CurrentHotel;
