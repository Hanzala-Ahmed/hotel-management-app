import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import ResponsiveNavBar from "../MaterialDesign/ResponsiveNavBar";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import BASE_URI from "../../core";
import axios from "axios";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

const names = [
  "Free Service",
  "Room Service",
  "Car rental services",
  "Catering services",
  "Concierge services",
  "Courier services",
  "Doctor on call",
  "Dry cleaning",
  "Excursions and guided tours",
  "Flower arrangement",
];

function getStyles(name, hotelServices, theme) {
  return {
    fontWeight:
      hotelServices.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const HotelAdmin = () => {
  const localUser = localStorage.getItem("user");
  const userLocal = JSON.parse(localUser);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [hotelServices, setServices] = useState([]);
  const [room, setRoom] = useState("");
  const [detail, setDetail] = useState("");
  const [hotel, setHotel] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setServices(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const roomHandleChange = (e) => {
    setRoom(e.target.value);
  };

  const detailHandle = (e) => {
    setDetail(e.target.value);
  };

  const hotelHandle = (e) => {
    setHotel(e.target.value);
  };

  const priceHandle = (e) => {
    setPrice(e.target.value);
  };

  const hotelObj = {
    userId: userLocal._id,
    hotelName: hotel,
    price: price,
    desc: detail,
    services: hotelServices,
    noOfRooms: room,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(hotelObj);
    let hotel = async () => {
      await axios
        .post(`${BASE_URI}user/hotel`, hotelObj)
        .then((res) => {
          let data = res.data;
          console.log(data);
          setLoading(false);
          if (data.message) {
            console.log("data");
            toast.error(data.message);
          } else {
            toast.success("Your hotel successfully created");
            setServices("")
            setRoom("")
            setDetail("")
            setHotel("")
            setPrice("")
          }
        })
        .catch((err) => console.log(err));
    };
    hotel();
    // console.log(price);
    // console.log(detail);
    // console.log(services);
    // console.log(room);
  };
  return (
    <>
      <ResponsiveNavBar profileBtn={false} />
      <Container sx={{ marginTop: "50px" }}>
        <Typography component="h1" variant="h5">
          Create Your Hotel
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
                name="hotelName"
                required
                fullWidth
                id="hotelName"
                label="Hotel Name"
                autoFocus
                onChange={hotelHandle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                required
                fullWidth
                id="price"
                label="Hotel Price"
                name="price"
                autoComplete="price"
                type="number"
                // onChange={lastNameHandle}
              /> */}
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  onChange={priceHandle}
                  startAdornment={
                    <InputAdornment position="start">Rs</InputAdornment>
                  }
                  label="Price"
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="number"
                draggable={false}
                label="Hotel detail"
                name="hotelDetail"
                type="text"
                inputProps={{ maxLength: 200 }}
                helperText="less than 200 words"
                onChange={detailHandle}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={hotelServices}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, hotelServices, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: "100%" }}
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
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="user" color="primary" />}
                label="Signup as admin"
                // onChange={roleHandle}
              />
            </Grid> */}
          </Grid>
          {loading ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, pointerEvents: "none", opacity: 0.4 }}
            >
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          )}

          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Container>
    </>
  );
};

export default HotelAdmin;
