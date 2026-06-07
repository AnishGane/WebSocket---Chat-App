import {
  addUserSocket,
  getOnlineUsers,
  removeUserSocket,
} from "./socket.service.js";
import { SOCKET_EVENTS } from "./socket.event.js";

export const handleSocketConnection = (io, socket) => {
  const userId = socket.userId;

  console.log("User connected:", userId);

  // Join room
  socket.join(userId.toString());

  // Save socket
  addUserSocket(userId, socket.id);

  // Emit online users
  io.emit(SOCKET_EVENTS.ONLINE_USERS, getOnlineUsers());

  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log("User disconnected:", userId);

    removeUserSocket(userId, socket.id);

    io.emit(SOCKET_EVENTS.ONLINE_USERS, getOnlineUsers());
  });
};
