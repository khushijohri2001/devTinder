const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_STRING = "firstName lastName photoUrl age gender";

// GET - All Users data
userRouter.get('/user/connections', userAuth, async(req, res) => {

    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                { fromUserId: loggedInUser._id, status: "accepted"},
                { toUserId: loggedInUser._id, status: "accepted"}
            ]
        })
        .populate("fromUserId", USER_SAFE_STRING)
        .populate("toUserId", USER_SAFE_STRING);

        const data = connectionRequest.map((request) => {
            // Can't compare two object id, we need to convert them into string
            if(request.fromUserId._id.toString() === loggedInUser._id.toString() ){
                
                return request.toUserId
            } else{
                return request.fromUserId;
            }
            
        } )
       
        res.send(data)
       
    }catch(err){
        res.status(400).send("ERROR: ", err.message)
    }
})

// Get all the pending connection request for the loggedin user
userRouter.get("/user/requests/pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_STRING);

    //get only the list of users not other details = array of pending connection requests
    const data = connectionRequest.map((request) => request.fromUserId)

    res.send(data);
  } catch (err) {
    res.status(400).send("ERROR: ", err.message);
  }
});

module.exports = userRouter;
