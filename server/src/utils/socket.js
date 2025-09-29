const socket = require("socket.io");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection",(socket) => {
    socket.on("joinChat", async ({ userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, photoUrl, userId, targetUserId, text }) => {
        const roomId = [userId, targetUserId].sort().join("_");

        // Save chat in database
        try {
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          io.to(roomId).emit("messageReceived", {
            senderId,
            firstName,
            lastName,
            photoUrl,
            text,
          });
        } catch (error) {}
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
