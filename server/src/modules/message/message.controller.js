import { asyncHandler } from "../../utils/async-handler.js";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/api-response.js";
import {
  getMessagesService,
  getUsersForSidebarService,
  markMessageAsSeenService,
  sendMessageService,
} from "./message.service.js";
import { io } from "../../socket/index.js";
import { SOCKET_EVENTS } from "../../socket/socket.event.js";

// Get all the users except the current/logged in user
export const getUsersForSidebar = asyncHandler(async (req, res) => {
  const data = await getUsersForSidebarService(req.user._id);

  sendResponse(res, httpStatus.OK, data, "Users fetched successfully");
});

// Get all messages between two users
export const getMessages = asyncHandler(async (req, res) => {
  const { id: selectedUserId } = req.params;

  const messages = await getMessagesService(req.user._id, selectedUserId);

  sendResponse(res, httpStatus.OK, messages, "Messages fetched successfully");
});

// API to mark message as seen using message id
export const markMessageAsSeen = asyncHandler(async (req, res) => {
  const { id: messageId } = req.params;

  const message = await markMessageAsSeenService(messageId, req.user._id);

  sendResponse(res, httpStatus.OK, message, "Message marked as seen");
});

// Send message to selected User
export const sendMessage = asyncHandler(async (req, res) => {
  const receiverId = req.params.id;

  const newMessage = await sendMessageService({
    senderId: req.user._id,
    receiverId,
    text: req.body.text,
    file: req.file,
  });

  io.to(receiverId.toString()).emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);

  sendResponse(res, httpStatus.OK, newMessage, "Message sent successfully");
});
