const express = require('express');
const requestRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { userAuth} = require("../middleware/auth")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        //initially only these 2
        const ALLOWED_ACCESS = ["interested", "ignored"];
        if(!ALLOWED_ACCESS.includes(status)){
            throw new Error("Invalid status")
        }

        //send request to existing user
        const existingUser = await User.findById({_id: toUserId});

        if(!existingUser){
            throw new Error("No user found")
        }

        // unique request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId: fromUserId, toUserId: toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })

        if(existingConnectionRequest){
            throw new Error("Request Already Exists")
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message: "Connect Request Sent Successfully!",
            data
        })
    } catch(err){
        res.status(400).send("Error: "+ err.message)
    }
})

module.exports = requestRouter;