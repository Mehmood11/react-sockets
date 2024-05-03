import React from "react";

const ChatContainer = ({ children }) => {
  return (
    <div className="card border-2 border-info w-100">
      <div className="row vh-95">
        <div className="d-flex flex-column col-12 col-lg-12 col-xl-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
