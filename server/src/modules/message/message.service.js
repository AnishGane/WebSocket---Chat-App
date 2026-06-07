import User from "../user/user.model.js";
import httpStatus from "http-status";
import { APIError } from "../../utils/api-error.js";
import { uploadImageToCloudinary } from "../../utils/upload-image.js";
import {
  createMessageRepo,
  findMessageByIdRepo,
  getMessagesRepo,
  getUnreadMessagesCountRepo,
  markMessagesSeenRepo,
} from "./message.repository.js";

export const getUsersForSidebarService = async (loggedInUserId) => {
  const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
    "-password",
  );

  const unseenMessages = {};
  const promises = allUsers.map(async (user) => {
    const count = await getUnreadMessagesCountRepo(user._id, loggedInUserId);

    if (count > 0) {
      unseenMessages[user._id] = count;
    }
  });
  await Promise.all(promises);

  return {
    allUsers,
    unseenMessages,
  };
};

// Get messages
export const getMessagesService = async (myId, selectedUserId) => {
  const messages = await getMessagesRepo(myId, selectedUserId);

  await markMessagesSeenRepo(selectedUserId, myId);

  return messages;
};

// Mark message as seen
export const markMessageAsSeenService = async (messageId, userId) => {
  const message = await findMessageByIdRepo(messageId);

  if (!message) {
    throw new APIError("Message not found", httpStatus.NOT_FOUND);
  }

  if (message.receiverId.toString() !== userId.toString()) {
    throw new APIError("Unauthorized", httpStatus.UNAUTHORIZED);
  }

  message.seen = true;

  await message.save();

  return message;
};

// Send Message
export const sendMessageService = async ({
  senderId,
  receiverId,
  text,
  file,
}) => {
  if (!text && !file) {
    throw new APIError(
      "Message must contain text or image",
      httpStatus.BAD_REQUEST,
    );
  }

  if (senderId.toString() === receiverId.toString()) {
    throw new APIError(
      "Cannot send message to yourself",
      httpStatus.BAD_REQUEST,
    );
  }

  const receiverExists = await User.findById(receiverId);
  if (!receiverExists) {
    throw new APIError("Receiver not found", httpStatus.NOT_FOUND);
  }

  let imageUrl = null;

  if (file) {
    const uploadedImage = await uploadImageToCloudinary(file, "messages");
    imageUrl = uploadedImage.url;
  }

  const newMessage = await createMessageRepo({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  return newMessage;
};
