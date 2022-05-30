const express = require("express");
const { bookHotel, getBookHotel } = require("../controllers/bookHotel");
const { createHotel, getHotel, getCurrentHotel } = require("../controllers/hotelAdmin");
const {loginController, getAllUser} = require("../controllers/loginController");
const signupController = require("../controllers/singupController");
const router = express.Router();

router.post("/user/signup", signupController);
router.post("/user/login", loginController);
router.post("/user/hotel", createHotel);
router.get("/user/hotel", getHotel);
router.post("/user/hotel/book", bookHotel);
router.get("/user/hotel/book", getBookHotel);

module.exports = router;