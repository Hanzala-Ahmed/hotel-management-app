import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import HotelAdmin from "./Components/HotelAdmin/HotelAdmin";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/Signup";
import "./App.css";
import CurrentHotel from "./Components/CurrentHotel/CurrentHotel";
// import { useEffect, useState } from "react";

function App() {
  // const [hotelName, setHotelName] = useState("")
  // var hotel = localStorage.getItem("hotel");
  // var localHoteData = JSON.parse(hotel);
  // var localHotelName = encodeURI(localHoteData.hotelName);
  // // setHotelName(localHotelName)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/hotelAdmin" element={<HotelAdmin />} />
      <Route path="hotel" element={<CurrentHotel />}>
        <Route path=":hotelName" element={<CurrentHotel />} />
      </Route>
    </Routes>
  );
}

export default App;
