const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  email: { type: String, unique: true },
  password: String,
  contact: { type: String, maxlength: 11 },
  role: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
