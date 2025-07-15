const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connetionRequest");
const User = require("../models/user");
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        return res.status(404).json({ message: "Status is not allowed" });
      }
      const toUser = await User.findById({ _id: toUserId });
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          ({ fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }),
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
          data
      });
    } catch (err) {
      res.status(500).send("ERROR : " + err.message);
    }
  }
);
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try{
    const loggedInUser =  req.user;
    const {status, requestId} =  req.params;
    const allowedStatus = ["accepted", "rejected"];
    const isAllowed = allowedStatus.includes(status);
    if (!isAllowed) {
      return res.status(404).json({ message: "Status is not allowed" });
    }
    const  connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    })
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection Request not found!" });
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({
      message: loggedInUser.firstName + " has " + status + " the request",
      data
    });
  }catch(err){
    res.status(500).send("ERROR : " + err.message);
  }
});
module.exports = requestRouter;
