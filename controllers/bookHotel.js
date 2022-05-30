const userModel = require("../models/bookNowSchema");

const bookHotel = async (req, res) => {
  const {
    userId,
    hotelId,
    bankName,
    creditCard,
    cardCode,
    expiryDate,
    booked,
  } = req.body;
  const userObj = {
    ...req.body,
    booked: true,
  };
  const existUser = [];
  const filters = {
    hotelId: hotelId,
  };
  userModel.find({ userId: userId }, (error, user) => {
    if (error) {
      res.send(error);
    } else if (user) {
      var out = user.filter((user) => {
        return Object.keys(filters).every((filter) => {
          return filters[filter] === user[filter];
        });
      });
      console.log(out);
      if (out.length === 0) {
        userModel.create(userObj, (error, newUser) => {
          if (error) {
            res.send(error);
          } else {
            console.log("booked");
            res.send({ message: "hotel successfully booked", data: newUser });
          }
        });
      } else if (out) {
        res.send({ message: "you have already booked this hotel", user });
      }
    } else {
      userModel.create(userObj, (error, newUser) => {
        if (error) {
          res.send(error);
        } else {
          console.log("booked");
          res.send({ message: "hotel successfully booked", data: newUser });
        }
      });
    }
  });
};

const getBookHotel = async (req, res) => {
  let userId = req.query.userId;
  console.log(userId);
  let hotel = await userModel.find({ userId });
  res.send({data: hotel})
};

module.exports = {
  bookHotel,
  getBookHotel,
};
