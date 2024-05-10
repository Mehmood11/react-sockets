import React from "react";

const ChatHeader = ({ user }) => {
  return (
    <div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
      <div className="d-flex align-items-center py-1">
        <div className="position-relative">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            className="rounded-circle mx-2"
            width="40"
            height="40"
            alt={user?.username}
          />
        </div>
        <div className="flex-grow-1">
          <strong>Logged in as {user?.username}</strong>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
