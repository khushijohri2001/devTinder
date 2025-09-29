import React from "react";

const RenderChatBubble = ({ currentMessage, loggedInUserId }) => {
  const { senderId, firstName, lastName, photoUrl, time, text } = currentMessage;
  
  return (
    <div>
      <div className={`chat  ${senderId === loggedInUserId ? "chat-end": "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt={firstName + " " + lastName}
              src={photoUrl}
            />
          </div>
        </div>

        <div className="chat-header">
          {firstName} {lastName}
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">{text}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </div>
  );
};

export default RenderChatBubble;
