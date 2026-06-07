import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const socketAuthMiddleware = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded?.userId) {
      console.warn("[Socket Auth] Token missing userId claim:", {
        socketId: socket.id,
      });
      return next(new Error("Authentication error"));
    }

    socket.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("[Socket Auth] Token verification failed:", {
      socketId: socket.id,
      error: error.message,
    });
    next(new Error("Authentication error"));
  }
};
