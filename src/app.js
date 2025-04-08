const express = require("express");
// const { adminAuth, userAuth } =require("./middlewares/auth")
const app = express(); // creating new expressJS application
const ConnectDB = require("./config/database");
const User = require("./models/user")

app.post("/signup", async(req,res)=>{
  const user = new User({
    firstName:"Anurag",
    lastName:"Pandey",
    emailId:"anuragpandey4142@gmail.com",
    password:"Asdf@9413"
  });
  try{
    await user.save();
    res.send("user information is saved into the database");
  } catch(err){
    res.status(500).send("Error in saving the data" + err.message);
  }
})

ConnectDB().then(
  ()=>{console.log("Database Connection is established...");
    app.listen(7777,()=>{
      console.log("Server is successfully listening on port 7777....")
    })
  }
).catch((err)=>{
  console.error("Database is not connected!!!");
});