const userModel = require("../models/hotelSchema")

const getAllHotel = async (req, res) => {
    try {
      const hotel = await userModel.find({}).sort({
        created_on: "-1",
      });
      res.send(hotel);
    } catch (error) {
      res.send({ error: "product not found" });
    }
  };

  module.exports = {
      getAllHotel
  }