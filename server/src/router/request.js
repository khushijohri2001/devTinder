const express = require('express');
const requestRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { userAuth} = require("../middleware/auth")

// For Sender - ME
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        
        const fromUserId = req.user._id; //loggedIn User
        const {status, toUserId }= req.params

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

// For Reciever - Elon, or connection request coming to ME
requestRouter.post("/request/review/:status/:fromUserId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user; // loggedIn User, toUserId
        const {status, fromUserId} = req.params; //coming from url
    
        // status can be accepted, rejected only
        const ALLOWED_ACCESS = ["accepted", "rejected"];
        if(!ALLOWED_ACCESS.includes(status)){
            throw new Error("Invalid Status")
        }

        // from -> to connect request already existed with interested
        const existingConnectionRequest = await ConnectionRequest.findOne({fromUserId: fromUserId, toUserId: loggedInUser._id, status: "interested"});

        console.log(existingConnectionRequest);
        

        if(!existingConnectionRequest){
           return res.status(404).send("Connection Request not found")
        }

        // in connected request toUserId must be the current logged in user
        if(!existingConnectionRequest.toUserId.equals(loggedInUser._id)){
            throw new Error("Invalid user")
        }

        // update status
        existingConnectionRequest.status = status;

        const data = await existingConnectionRequest.save()

        res.json({
            message: "Connection "+ status ,
            data
        })
        

    } catch(err){
        res.status(400).send({ message: "ERROR: " + err.message})
    }
})

module.exports = requestRouter;