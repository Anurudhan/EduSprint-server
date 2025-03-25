import mongoose from "mongoose";

export enum contentType {
    text = "text",
    image = "image",
    video = "video",
    audio = "audio",
    file = "file",
}

export interface IMessage {
    _id?: string | mongoose.Types.ObjectId;
    chatId: string | mongoose.Types.ObjectId;
    sender: string | mongoose.Types.ObjectId;
    content: string;
    contentType: contentType;
    fileUrl?: string;
    replyTo?: string | mongoose.Types.ObjectId;
    isEdited?: boolean;
    isDeleted?: boolean;
    readBy?: Array<{
        userId: string | mongoose.Types.ObjectId | null;
        readAt: Date;
    }>;
    reactions?: Array<{
        userId: string | mongoose.Types.ObjectId | null;
        emoji: string;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}