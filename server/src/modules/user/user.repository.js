import User from "./user.model.js";

export const checkExistingUserRepo = async (email, fullName) => {
  return User.findOne({
    $or: [{ email }, { fullName }],
  });
};

export const createUserRepo = async (user) => User.create(user);

export const updateUserProfileRepo = async (userId, data) => {
  return User.findByIdAndUpdate(userId, data, {
    new: true,
  }).select("-password");
};
