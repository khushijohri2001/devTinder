const express = require('express');
const userRouter = express.Router();
const User = require("../models/user");

// GET - All Users data
userRouter.get('/user/connections', async(req, res) => {

    try{
        const users = await User.find({});

        if(!users){
            res.status(404).send("User not found")
        } else{
            res.send(users, "User found!")
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

module.exports = userRouter;