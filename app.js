const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes/routes"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const baseUri =
  "mongodb+srv://hanzalaadmin:adminhanzala123@cluster0.gq4zt.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(baseUri);
mongoose.connection.on("connected", () => {console.log(("mongoose connected"));});
mongoose.connection.on("error", (error) => {console.log((error));});

app.use(router)

app.listen(PORT, () => {`serving running on localhost:${PORT}`})