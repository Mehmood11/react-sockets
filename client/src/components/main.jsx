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

  useEffect(() => {
    socket.on("users", (users) => {
      console.log(users);
      const messageArr = [];
      for (const { userId, username } of users) {
        const newMessage = { type: "UserStatus", userId, username };
        messageArr.push(newMessage);
      }

      setMessages([...messages, messageArr]);
      setUsers(users);
    });
    socket.on("session", ({ userId, username }) => {
      setUser({ userId, username });
    });
  }, [socket, messages]);
  return (
    <main className="content">
      <div className="container mt-3">
        {user ? (
          <Chat user={user} message={message} setMessage={setMessage} />
        ) : (
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
