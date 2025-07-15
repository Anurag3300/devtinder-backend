const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async(req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("invalid token, please login again");
    }
    const decodedToken = jwt.verify(token, "Anurag@pandey1234");
    console.log(decodedToken);
    const { _id } = decodedToken;
    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
};
module.exports = {
  userAuth,
};
