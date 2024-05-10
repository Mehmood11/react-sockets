import React from "react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatContainer from "./chat-container";

const Chat = ({ user, message, messages, setMessage }) => {
  console.log("messages", messages);
  return (
    <ChatContainer>
      <ChatHeader user={user} />
      <div className="position-relative  chat-height overflow-auto">
        <div className="d-flex flex-column p-4">
          {messages?.map((message, idx) => {
            console.log(message.type);
            return (message.type = "userStatus" ? (
              <div key={idx} className="text-center">
                <span className="badge badge-info">
                  {message.userId === user?.userId
                    ? "You have joined!"
                    : `${message.username} has joined}`}
                </span>
              </div>
            ) : null);
          })}
        </div>
      </div>
      <ChatInput message={message} setMessage={setMessage} />
    </ChatContainer>
  );
};

export default Chat;
