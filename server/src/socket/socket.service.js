import { userSocketMap } from "./socket.store.js";

// Add socket connection
export const addUserSocket = (userId, socketId) => {
  if (!userSocketMap.has(userId)) {
    userSocketMap.set(userId, new Set());
  }

  userSocketMap.get(userId).add(socketId);
};

// Remove socket connection
export const removeUserSocket = (userId, socketId) => {
  const userSockets = userSocketMap.get(userId);

  if (!userSockets) return;

  userSockets.delete(socketId);

  if (userSockets.size === 0) {
    userSocketMap.delete(userId);
  }
};

// Get online users
export const getOnlineUsers = () => {
  return [...userSocketMap.keys()];
};
