import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const useSocketMap: Record<string, string> = {};

export const getReceiverSocketId = (receiverId: string) => {
  return useSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("user connected " + socket.id);

  const userId = Array.isArray(socket.handshake.query.userId)
    ? socket.handshake.query.userId[0]
    : socket.handshake.query.userId;

  if (userId !== undefined) {
    useSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(useSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected " + socket.id);
    if (userId) {
      delete useSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(useSocketMap));
    }
  });
});

export { app, io, server };
