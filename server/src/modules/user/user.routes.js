import express from "express";
import {
    checkAuth,
  loginController,
  signupController,
  updateProfile,
} from "./user.controller.js";
import { protectRoute } from "../../middleware/auth.middleware.js";
import upload from "../../middleware/multer.middleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile,
);
router.get("/check", protectRoute, checkAuth);

export default router;
