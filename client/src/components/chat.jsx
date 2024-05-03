import React from "react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatContainer from "./chat-container";

const Chat = ({ user, message, setMessage }) => {
  return (
    <ChatContainer>
      <ChatHeader user={user} />
      <ChatInput message={message} setMessage={setMessage} />
    </ChatContainer>
  );
};

export default Chat;
