const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_STRING = "firstName lastName photoUrl age gender";

// GET - All Users data
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_STRING)
      .populate("toUserId", USER_SAFE_STRING);

    const data = connectionRequest.map((request) => {
      // Can't compare two object id, we need to convert them into string
      if (request.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return request.toUserId;
      } else {
        return request.fromUserId;
      }
    });

    res.send(data);
  } catch (err) {
    res.status(400).send("ERROR: ", err.message);
  }
});

// Get all the pending connection request for the loggedin user
userRouter.get("/user/requests/pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_STRING);

    //get only the list of users not other details = array of pending connection requests
    const data = connectionRequest.map((request) => request.fromUserId);

    res.send(data);
  } catch (err) {
    res.status(400).send("ERROR: ", err.message);
  }
});

// GET - Feed
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;


    const loggedInUser = req.user;

    // listing all user that we want to hide
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((request) => {
      // other users, including ourself
      // convert to string as object id will always be unique
      hideUsersFromFeed.add(request.fromUserId._id.toString());
      hideUsersFromFeed.add(request.toUserId._id.toString());
    });

    // filter out these users from all Users
    const user = await User.find({
      // current user is already in hideUsersFromFeed list but still lets just add him
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
    .select(USER_SAFE_STRING)
    .skip(skip)
    .limit(limit);

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: ", err.mssage);
  }
});

module.exports = userRouter;
