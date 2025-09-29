const express = require('express');
const chatRouter = express.Router();
const Chat = require("../models/chat");
const { userAuth } = require('../middleware/auth');

chatRouter.get("/chat/:targetUserId", userAuth, async(req, res) => {
    const userId = req.user._id;
    const {targetUserId} = req.params;

    try{
        
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId]}
        }).populate({
            path: "messages.senderId",
            select: "_id firstName lastName createdAt photoUrl"
        })

        if(!chat){
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: []
            })
        }
        

        await chat.save();
        res.json(chat);
    }catch(err) {
        res.status(400).send({ message: err.message || "Something went wrong" });
    }
})


module.exports = chatRouter