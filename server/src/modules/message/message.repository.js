import Message from "./message.model.js";

// Get Sidebar Users unread count messages
export const getUnreadMessagesCountRepo = async (senderId, receiverId) => {
  return await Message.countDocuments({
    senderId,
    receiverId,
    seen: false,
  });
};

// Get messages between two users
export const getMessagesRepo = async (myId, selectedUserId) => {
  return await Message.find({
    $or: [
      { senderId: myId, receiverId: selectedUserId },
      { senderId: selectedUserId, receiverId: myId },
    ],
  }).sort({ createdAt: 1 });
};

// Mark messages as seen
export const markMessagesSeenRepo = async (senderId, receiverId) => {
  return Message.updateMany({ senderId, receiverId }, { seen: true });
};

// Find Single Message
export const findMessageByIdRepo = async (messageId) => {
  return Message.findById(messageId);
};

// Create message
export const createMessageRepo = async (data) => {
  return Message.create(data);
};
