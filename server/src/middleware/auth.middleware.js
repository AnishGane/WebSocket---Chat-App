import { ENV } from "../config/env.js";
import User from "../modules/user/user.model.js";
import { APIError } from "../utils/api-error.js";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new APIError("Not authorized", httpStatus.UNAUTHORIZED);
  }

  const jwtSecret = ENV.JWT_SECRET;
  if (!jwtSecret)
    throw new APIError(
      "JWT secret not found",
      httpStatus.INTERNAL_SERVER_ERROR,
    );

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) throw new APIError("User not found", httpStatus.NOT_FOUND);

    req.user = user;
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError("Not authorized", httpStatus.UNAUTHORIZED);
  }
  next();
};
