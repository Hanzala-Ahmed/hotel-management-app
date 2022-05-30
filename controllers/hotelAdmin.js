const userModel = require("../models/hotelSchema");

const createHotel = async (req, res) => {
  const { userId, hotelName, desc, services, noOfRooms } = req.body;

  if (!hotelName || !desc || !services || !noOfRooms) {
    return res.json({ message: "Required field are missing" });
  }
  const user = await userModel.findOne({ userId: userId }).sort({
    created_on: "-1",
  });
  if (!user) {
    userModel.create(req.body, (err, data) => {
      res.send(data);
    });
  } else {
    res.send({ message: "you have already created one hotel" });
  }
};

const getHotel = async (req, res) => {
  console.log(req.query.price);
  console.log(req.query.rooms);
  console.log(req.query.service);
  console.log(req.query.hotelid);
  let price = req.query.price;
  let rooms = req.query.rooms;
  let service = req.query.service;
  let hotelId = req.query.hotelid;
  let priceValue = "";
  if (price) {
    if (price === "low to high") {
      priceValue = "1";
    } else if (price === "high to low") {
      priceValue = "-1";
    }
  }
  try {
    const hotel =
      rooms && service && price
        ? await userModel
            .find({ services: { $in: [service, "Lisp"] }, noOfRooms: rooms })
            .sort(
              priceValue
                ? {
                    price: priceValue,
                  }
                : null
            )
        : hotelId
        ? await userModel.findById({ _id: hotelId })
        : await userModel.find({});
    res.send(hotel);
    console.log(hotel);
  } catch (error) {
    res.send({ error: "product not found" });
  }
};

module.exports = {
  createHotel,
  getHotel,
};
