import React from "react";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatContainer from "./chat-container";
import ScrollableFeed from "react-scrollable-feed";
const Chat = ({ user, message, messages, sendMessage, setMessage }) => {
  return (
    <ChatContainer>
      <ChatHeader user={user} />
      <div className="position-relative  chat-height overflow-auto">
        <ScrollableFeed>
          <div className="d-flex flex-column p-4">
            {messages?.map((chatMessage, idx) => {
              return chatMessage.type === "userStatus" ? (
                <div key={idx} className="text-center">
                  <span className="badge badge-info">
                    {chatMessage.userId === user?.userId
                      ? "You have joined!"
                      : `${chatMessage.username} has joined`}
                  </span>
                </div>
              ) : (
                <div
                  key={idx}
                  className={
                    chatMessage.userId === user.userId
                      ? "chat-message-right pb-4"
                      : "chat-message-left pb-4"
                  }
                >
                  <div>
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      className="rounded-circle mr-1"
                      alt={chatMessage.username}
                      title={chatMessage.username}
                      width="40"
                      height="40"
                    />
                    <div className="text-muted small text-nowrap mt-2">
                      12:00 AM
                    </div>
                  </div>
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    <div className="font-weight-bold mb-1">
                      {chatMessage.userId === user.userId
                        ? "You"
                        : chatMessage.username}
                    </div>
                    {chatMessage.message}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollableFeed>
      </div>
      <ChatInput
        message={message}
        sendMessage={sendMessage}
        setMessage={setMessage}
      />
    </ChatContainer>
  );
};

export default Chat;
