const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  hotelId: String,
  bankName: String,
  creditCard: String,
  cardCode: String,
  expiryDate: String,
  booked: false,
});

const userModel = mongoose.model("bookedHotels", userSchema);

module.exports = userModel;
