import express from "express";
import authRoutes from "../modules/user/user.routes.js";
import messageRoutes from "../modules/message/message.routes.js";

const router = express.Router();

router.get("/status", (_, res) => {
  res.send("Server is live!");
});

router.use("/auth", authRoutes);
router.use("/message", messageRoutes);

export default router;
