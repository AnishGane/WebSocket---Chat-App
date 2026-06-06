import { APIError } from "../../utils/api-error.js";
import { generateToken } from "../../utils/token.js";
import { uploadImageToCloudinary } from "../../utils/upload-image.js";
import {
  checkExistingUserRepo,
  createUserRepo,
  updateUserProfileRepo,
} from "./user.repository.js";
import httpStatus from "http-status";

export const signupService = async (email, fullName, password, bio) => {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedFullName = fullName.trim();

  const normalizedBio = bio?.trim() || "";

  const existingUser = await checkExistingUserRepo(
    normalizedEmail,
    normalizedFullName,
  );

  if (existingUser) {
    if (existingUser.email === normalizedEmail) {
      throw new APIError("Email already exists", httpStatus.BAD_REQUEST);
    }
    if (existingUser.fullName === normalizedFullName) {
      throw new APIError("Full name already exists", httpStatus.BAD_REQUEST);
    }
  }

  const newUser = await createUserRepo({
    email: normalizedEmail,
    fullName: normalizedFullName,
    password,
    bio: normalizedBio,
  });

  const token = generateToken(newUser._id);

  return { newUser, token };
};

export const loginService = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await checkExistingUserRepo(normalizedEmail);

  if (!user) {
    throw new APIError("Invalid credentials", httpStatus.UNAUTHORIZED);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new APIError("Invalid credentials", httpStatus.UNAUTHORIZED);
  }

  const token = generateToken(user._id);

  return { user, token };
};

export const updateUserProfileService = async (userId, data, file) => {
  if (!userId) {
    throw new APIError("User not found", httpStatus.NOT_FOUND);
  }

  let profilePicUrl = null;

  // upload image if file exists
  if (file) {
    const uploadedImage = await uploadImageToCloudinary(file, "profile-pics");

    profilePicUrl = uploadedImage.url;
  }

  const updateData = {};
  if (data.fullName !== undefined) updateData.fullName = data.fullName;
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (profilePicUrl) updateData.profilePic = profilePicUrl;

  const updatedUser = await updateUserProfileRepo(userId, updateData);

  return updatedUser;
};
