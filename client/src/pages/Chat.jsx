import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RenderChatBubble from "../components/common/RenderChatBubble";
import RenderInputField from "../components/common/RenderInputField";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../redux/constants";
import axios from "axios";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { _id, photoUrl, firstName, lastName } = user || {};
  const userId = _id;

  const fetchChatMessages = async () => {
    const response = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = response?.data?.messages.map((msg) => {
      const { senderId, text } = msg;

      return {
        senderId: senderId._id,
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId?.photoUrl,
        time: senderId?.createdAt,
        text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ senderId, firstName, lastName, photoUrl, text }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {senderId, firstName, lastName, photoUrl, text },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessageHandler = () => {
    const socket = createSocketConnection();

    // Todo: Add date and time

    socket.emit("sendMessage", {
      firstName,
      lastName,
      photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("")
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl mb-4 text-center">Chat</h2>
      <div className="border-2 border-gray-500 w-[80vw] h-[80vh] m-auto rounded-lg flex flex-col">
        <div className="flex gap-2 items-center p-4 border-b-2">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt={`${firstName} ${lastName}`} src={photoUrl} />
            </div>
          </div>
          <span>
            {firstName} {lastName}
          </span>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {messages.map((msg, index) => {
            return <RenderChatBubble key={index} currentMessage={msg} loggedInUserId={userId} />;
          })}
        </div>

        <div className="flex">
          <div className="flex-1">
            <RenderInputField
              name="message"
              value={newMessage}
              placeholder="Type your message..."
              handler={(e) => setNewMessage(e.target.value)}
            />
          </div>
          <button
            className="bg-violet-900 text-white py-2 px-4 rounded-br-lg"
            onClick={sendMessageHandler}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
