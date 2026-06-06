import "dotenv/config"
import app from "./app.js"
import http from "http";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const server = http.createServer(app);

// Connect to DB 
await connectDB();

const PORT = ENV.PORT
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))