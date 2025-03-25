import mongoose from "mongoose";
import { ChatStatus, ChatType, SubscriptionType } from "../../../domain/entities";

const chatSchema = new mongoose.Schema({
  chatType: { type: String, enum: Object.values(ChatType), required: true },
  status: { type: String, enum: Object.values(ChatStatus), default: ChatStatus.requested },
  subscriptionType: { type: String, enum: Object.values(SubscriptionType), default: SubscriptionType.none },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  name: { type: String, default: null }, // Allow null explicitly
  avatar: { type: String, default: null }, // Allow null explicitly
  lastMessage: {
    messageId: { type: String },
    content: { type: String },
    sender: { type: String },
    timestamp: { type: Date },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  unreadCount: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    count: { type: Number, default: 0 },
  }],
});

export const Chat = mongoose.model("Chat", chatSchema);