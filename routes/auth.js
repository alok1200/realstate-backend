const User = require("../models/User");
const routes = require("express").Router();


//login route
routes.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password === pass)
        return res.status(200).json({ message: "login success" });
      return res.status(400).json({ message: "password dosent matched" });
    } else {
      res.status(404).json({ message: "user with this email dosent exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

routes.post("/register", async (req, res) => {
  try {
    const dbUser = await User.create(req.body);
    res.status(200).json({ message: "register successfull" });
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      return res
        .status(401)
        .json({ message: "user with this email already exist" });
    }
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = routes;
