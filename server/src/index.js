import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Authentication error"));
  }
  socket.username = username;
  socket.userId = uuidv4();
  next();
});
io.on("connection", async (socket) => {
  console.log("a user connected");
  // all connected users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({ userId: socket.userId, username: socket.username });
  }

  // all users event
  socket.emit("users", users);
  // connected user details
  socket.emit("session", { userId: socket.userId, username: socket.username });
  // socket.on('disconnect', () => {
  //     console.log('user disconnected')
  // })

  // New User Event
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
  });

  //New Message Event
  socket.on("new message", (message) => {
    socket.broadcast.emit("new message", {
      userId: socket.userId,
      username: socket.username,
      message,
    });
  });
});

console.log("Listening on port 4000");
httpServer.listen(process.env.PORT || 4000);
