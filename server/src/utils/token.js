import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "1d",
  });
};
