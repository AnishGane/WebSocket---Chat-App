import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import {
  getMessages,
  markMessageAsSeen,
  getUsersForSidebar,
  sendMessage,
} from "./message.controller.js";
import upload from "../../middleware/multer.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.put("/seen/:id", protectRoute, markMessageAsSeen);
router.post("/send/:id", protectRoute, upload.single("file"), sendMessage);

export default router;
