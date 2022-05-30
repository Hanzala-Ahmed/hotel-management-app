const bcryptjs = require("bcryptjs");
const userModel = require("../models/userSchema");

const signupController = async (req, res) => {
  const { userName, email, password, contact, role } = req.body;
  if (!userName || !email || !password || !contact || !role) {
    return res.json({ _message: "Required fields are empty" });
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const userObj = {
    ...req.body,
    password: hashPassword,
  };
  // const isUserAlreadyExist=await  userModel.findOne({ email })
  // if(isUserAlreadyExist){

  // }
  userModel.findOne({ email }, (error, user) => {
    if (error) {
      res.send(error);
    } else if (user) {
      console.log(user);
      res.json({ _message: "email is already exist" });
    } else {
      userModel.create(userObj, (error, newUser) => {
        if (error) {
          res.send(error);
        } else {
          res.send({ message: "user successfully signup", data: newUser });
        }
      });
    }
  });
};

module.exports = signupController;
