const { createHashWithSault } = require("../helpers/hash");
const { createJWT } = require("../helpers/token");
const User = require("../models/User");
const routes = require("express").Router();



//login route
routes.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if(!user) return res.status(404).json({ message: "user with this email dosent exist" });
    if (user.password !== createHashWithSault(pass)) return res.status(400).json({ message: "password dosent matched" })

    const token = createJWT({id: user._id, isAdmin: user.isAdmin})
    
    const finalUser = {...user._doc, token}
    delete finalUser.password;
    res.status(200).json({...finalUser, token})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

routes.post("/register", async (req, res) => {
  try {
    req.body.password = createHashWithSault(req.body.password)
    await User.create(req.body);
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
