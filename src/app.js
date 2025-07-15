const express = require("express");
// const { adminAuth, userAuth } =require("./middlewares/auth")
const app = express(); // creating new expressJS application
const ConnectDB = require("./config/database");
const User = require("./models/user");
const { validation } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser()); 
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



ConnectDB()
  .then(() => {
    console.log("Database Connection is established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777....");
    });
  })
  .catch((err) => {
    console.error("Database is not connected!!!");
  });
