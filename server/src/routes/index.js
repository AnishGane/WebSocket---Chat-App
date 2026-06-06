import express from "express";
import authRoutes from "../modules/user/user.routes.js";

const router = express.Router();

router.get("/status", (_, res) => {
  res.send("Server is live!");
});

router.use("/auth", authRoutes);

export default router;
