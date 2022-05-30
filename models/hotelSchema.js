const mongoose = require("mongoose");


const hotelSchema = new mongoose.Schema({
    userId: String,
    hotelName: String,
    desc: String,
    price: Number,
    services: [],
    noOfRooms: String,
})


const userModel = mongoose.model("hotel", hotelSchema);

module.exports = userModel