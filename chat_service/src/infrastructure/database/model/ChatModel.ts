import { model, Schema } from "mongoose";
import { userSchema } from "./UserModel";
import { ChatEntity } from "../../../domain/entities";

const chatSchema = new Schema({
    // Store complete user objects instead of just IDs
    participants:[{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    
    type: {
        type: String,
        enum: ['individual', 'group'],
        default: 'individual',
        required: true
    },
    status: {
        type: String,
        enum: ['requested', 'active', 'block'],
        default: 'active'
    },
    lastSeen: {
        type: Date
    },
    lastMessage: {
        type: Schema.Types.Mixed, // Store the entire message object
        default: null
    },
    unreadCounts: {
        type: Number,
        default: 0
    },
    subscriptionType: {
        type: String,
        enum: ["none", "basic", "standard", "premium"],
        default: "basic"
    },
    // Group-specific fields
    groupName: {
        type: String
    },
    groupDescription: {
        type: String
    },
    // Single participant - if needed for specific user info
    participant:  {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
});

// Validation for group chats
chatSchema.pre('save', function(next) {
    if (this.type === 'group' && !this.groupName) {
        const error = new Error('Group name is required for group chats');
        return next(error);
    }
    next();
});

export const Chat = model<ChatEntity>("chats", chatSchema);