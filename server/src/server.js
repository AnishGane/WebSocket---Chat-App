import "dotenv/config";
import app from "./app.js";
import http from "http";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";
import { setIO } from "./socket/index.js";

const server = http.createServer(app);

// Initialize socket server
const socketIO = initializeSocket(server);

// Store global io instance
setIO(socketIO);

// Connect to DB
await connectDB();

const PORT = ENV.PORT;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
