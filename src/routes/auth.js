const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");
const { validation } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  // vadiation of data
  try {
     validation(req);
    const { firstName, lastName, emailId, password } = req.body;
    //encripting the password
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user information is saved into the database");
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    if (!validator.isEmail(emailId)) {
      throw new Error("Enter valid email");
    }
    const user = await User.findOne({ emailId: emailId });
    console.log(user.validatePassword);
    if (!user) {
      throw new Error("invalid cardentials");
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      throw new Error("invalid cardentials");
    }
    // create a jwt token
    const token = await user.getJwt();
    console.log(token);

    //create a cookie with the token and send it to the user browser
    res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
    res.send("Login successful");
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});
authRouter.post("/logout",async (req,res)=>{
  res.cookie("token",null,{expires: new Date(Date.now())})
  res.send("Logout successfull")

})
module.exports = authRouter;