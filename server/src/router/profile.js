const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");


// GET - Specific User data
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
     const {user} = req;
        res.send({user: user, message: "User found Successfully"})
      
  
    } catch (err) {
      res.status(400).send({ message: err.message || "Something went wrong" });
    }
  });

//  DELETE - Remove User by id
profileRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    console.log(user);

    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//  PATCH - Update User data by Id
profileRouter.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const newUserData = req.body;

  try {
    const ALLOWED_ACCESS = ["userId", "firstName", "lastName", "age", "gender"];
    const isUpdateAllowed = Object.keys(newUserData).every((key) =>
      ALLOWED_ACCESS.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Cannot update data. Invalid Field!");
    }

    const user = await User.findByIdAndUpdate(userId, newUserData);
    console.log(user);

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

module.exports = profileRouter;