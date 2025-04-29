const express = require("express");
const profileRouter = express.Router();
const bcrypt = require('bcrypt')

const User = require("../models/user");

const { userAuth } = require("../middleware/auth");
const { validateProfileEditData, validatePasswordResetData } = require("../utils/validation")


// GET /profile/view - Specific User data
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
     const {user} = req;
        res.send({user: user, message: "User found Successfully"})
      
  
    } catch (err) {
      res.status(400).send({ message: err.message || "Something went wrong" });
    }
  });

//  DELETE /profile/remove - Remove User by id
profileRouter.delete("/profile/remove", userAuth, async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    console.log(user);

    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//  PATCH /profile/edit - Update User data by Id
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
try{
  if (!validateProfileEditData(req)) {
    throw new Error("Cannot update data. Invalid Field!");
  }

  const loggedInUser = req.user;
  Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])

  await loggedInUser.save();

  res.send({data: loggedInUser, message: loggedInUser.firstName + "'s profile updated successfully!"});

  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//  PATCH /profile/reset-password - Update User data by Id
profileRouter.patch("/profile/reset-password", userAuth, async (req, res) => {
  try{
    
    if (!validatePasswordResetData(req)) {
      throw new Error("Enter a valid Data");
    }
  // current user data
    const loggedInUser = req.user;
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    loggedInUser.password = hashedPassword
  
    await loggedInUser.save();

    res.cookie("token", null, { expires: new Date(Date.now())})
  
    res.send({data: loggedInUser, message: loggedInUser.firstName + "'s password reset successfully!"});
  
    } catch (err) {
      res.status(400).send("Something went wrong" + err);
    }
  });

module.exports = profileRouter;