const bcryptjs = require("bcryptjs");
const userModel = require("../models/userSchema");

const loginController = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "Required field are missing" });
  }

  userModel.findOne({ email }, async (error, user) => {
    if (error) {
      res.send(error);
    } else if (user) {
      await bcryptjs
        .compare(password, user.password)
        .then((password) => {
          if (password) {
            res.send({ message: "user successfully login", data: user });
          } else {
            res.send({ error: "Invalid User" });
          }
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.json({ error: "user doesnot exist" });
    }
  });
};

module.exports = { loginController };
