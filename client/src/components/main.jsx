import React, { useEffect, useState } from "react";
import Chat from "./chat";
import Login from "./login";

const Main = ({ socket }) => {
  const [newUsername, setNewUsername] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function handleChange({ currentTarget: input }) {
    setNewUsername(input.value);
  }

  const logNewUser = () => {
    socket.auth = { username: newUsername };
    socket.connect();
  };

  const sendMessage = () => {
    socket.emit("new message", message);

    const newMessage = {
      type: "message",
      userId: user.userId,
      username: user.username,
      message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("users", (users) => {
      const messageArr = [];
      for (const { userId, username } of users) {
        const newMessage = { type: "userStatus", userId, username };
        messageArr.push(newMessage);
      }

      setMessages([...messages, ...messageArr]);
      setUsers(users);
    });
    socket.on("session", ({ userId, username }) => {
      setUser({ userId, username });
    });

    socket.on("user connected", ({ userId, username }) => {
      const newMessage = { type: "userStatus", userId, username };
      setMessages([...messages, newMessage]);
    });

    socket.on("new message", ({ userId, username, message }) => {
      const newMessage = {
        type: "message",
        userId: userId,
        username: username,
        message,
      };

      setMessages([...messages, newMessage]);
    });
  }, [socket, messages]);

  return (
    <main className="content">
      <div className="container mt-3">
        {user?.userId && (
          <Chat
            user={user}
            message={message}
            messages={messages}
            sendMessage={sendMessage}
            setMessage={setMessage}
          />
        )}{" "}
        {!user?.userId && (
          <Login
            newUsername={newUsername}
            handleChange={handleChange}
            logNewUser={logNewUser}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
