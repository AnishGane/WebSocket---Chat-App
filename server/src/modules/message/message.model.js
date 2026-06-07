import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

messageSchema.pre("validate", function (next) {
  if (!this.text && !this.image) {
    next(new Error("Message must contain either text or image"));
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
