const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

// GET - All Users data
// userRouter.get('/user/connections', async(req, res) => {

//     try{
//         const users = await User.find({});

//         if(!users){
//             res.status(404).send("User not found")
//         } else{
//             res.send(users, "User found!")
//         }
//     }catch(err){
//         res.status(400).send("Something went wrong")
//     }
// })

// Get all the pending connection request for the loggedin user
userRouter.post("/user/requests/pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl age gender");

    //get only the list of users not other details = array of pending connection requests
    const data = connectionRequest.map((request) => request.fromUserId)

    res.send(data);
  } catch (err) {
    res.status(400).send("ERROR: ", err.message);
  }
});

module.exports = userRouter;
