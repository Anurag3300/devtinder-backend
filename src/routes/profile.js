const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileAllowed } = require("../utils/validation");

profileRouter.get("/profile/view",userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
  try{
    if(!validateEditProfileAllowed(req)){
      throw new Error("Profile Edit is not allowed");
    }
    const logedInUser = req.user;
    console.log(logedInUser,"fsjakdfhaiohdfo");
    Object.keys(req.body).forEach((key)=> (logedInUser[key] = req.body[key]));
    logedInUser.save();
    res.send("edit is successfull");
    console.log(logedInUser);
  } catch(err){
    res.status(400).send("ERROR:"+err.message)
  }
})

// profileRouter.post("/profile/forgotPassword")
module.exports = profileRouter;