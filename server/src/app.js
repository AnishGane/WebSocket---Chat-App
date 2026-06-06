import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { ENV } from "./config/env.js";

const app = express();

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(
  cors({
    origin: ENV.CLIENT_URL,
  }),
);

app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", routes);

app.use(errorHandler);

export default app;
