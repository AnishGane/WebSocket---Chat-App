import { APIError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import httpStatus from "http-status";
import {
  loginService,
  signupService,
  updateUserProfileService,
} from "./user.service.js";
import { sendResponse } from "../../utils/api-response.js";

// signup controller
export const signupController = asyncHandler(async (req, res) => {
  const { email, fullName, password, bio } = req.body;

  if (!fullName || !email || !password || !bio) {
    throw new APIError(
      "Please provide all required fields",
      httpStatus.BAD_REQUEST,
    );
  }

  const { newUser, token } = await signupService(
    email,
    fullName,
    password,
    bio,
  );

  sendResponse(
    res,
    httpStatus.CREATED,
    { newUser, token },
    "User created successfully",
  );
});

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new APIError(
      "Please provide all required fields",
      httpStatus.BAD_REQUEST,
    );
  }

  const { user, token } = await loginService(email, password);

  sendResponse(
    res,
    httpStatus.OK,
    { user, token },
    "User logged in successfully",
  );
});

// To check if user is authenticated
export const checkAuth = (req, res) => {
  sendResponse(res, httpStatus.OK, req.user, "User is authenticated");
};

// To update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, bio } = req.body;

  const userId = req.user._id;

  const updatedUser = await updateUserProfileService(
    userId,
    { fullName, bio },
    req.file,
  );

  sendResponse(
    res,
    httpStatus.OK,
    updatedUser,
    "User profile updated successfully",
  );
});
