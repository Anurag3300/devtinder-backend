const express  = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connetionRequest');

const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName age gender photoUrl about skills");
        res.json({
            message: "Connection requests received",
            data: connectionRequests
        });

    }catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = userRouter;