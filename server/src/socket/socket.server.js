import {Server} from "socket.io";
import { ENV } from "../config/env.js";
import { socketAuthMiddleware } from "./socket.middleware.js";
import { SOCKET_EVENTS } from "./socket.event.js";
import { handleSocketConnection } from "./socket.handler.js";

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
          origin: ENV.CLIENT_URL,
          credentials: true,
        },
      });
    
      // Middleware
      io.use(socketAuthMiddleware);
    
      // Connection
      io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        handleSocketConnection(io, socket);
      });
    
      return io;
}