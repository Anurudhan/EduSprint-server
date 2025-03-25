// models/Message.ts
import mongoose from 'mongoose';
import { contentType } from '../../../domain/entities';

const MessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  contentType: { 
    type: String, 
    enum: contentType, 
    default: contentType.text
  },
  fileUrl: { type: String },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  isEdited: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  readBy: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    readAt: { type: Date, default: Date.now }
  }],
  reactions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: { type: String }
  }]
}, { timestamps: true });


export const Message = mongoose.model('Message', MessageSchema);