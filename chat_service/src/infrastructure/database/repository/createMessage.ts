import mongoose from "mongoose";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { IMessage } from "../../../domain/entities";
import { Message } from "../model";

export const createMessage = async (data: IMessage): Promise<IMessage | null> => {
    try {
        // Convert string IDs to ObjectIds for MongoDB
        const messageData = {
            ...data,
            // Convert chatId to ObjectId
            chatId: new mongoose.Types.ObjectId(data.chatId.toString()),
            
            // Convert sender to ObjectId
            sender: new mongoose.Types.ObjectId(data.sender.toString()),
            
            // Convert replyTo to ObjectId if it exists
            replyTo: data.replyTo ? new mongoose.Types.ObjectId(data.replyTo.toString()) : undefined,
            
            // Convert readBy array if it exists, with null checking
            readBy: data.readBy ? data.readBy.map(item => ({
                ...item,
                userId: item.userId ? new mongoose.Types.ObjectId(item.userId.toString()) : null
            })) : [],
            
            // Convert reactions array if it exists, with null checking
            reactions: data.reactions ? data.reactions.map(item => ({
                ...item,
                userId: item.userId ? new mongoose.Types.ObjectId(item.userId.toString()) : null
            })) : []
        };

        // Create the message
        const message = await Message.create(messageData);

        if (!message) {
            throw ErrorResponse.internalError("Message creation error");
        }

        // Convert Mongoose document back to domain entity
        const messageObject = message.toObject();
        
        // Convert ObjectIds back to strings, with null checking
        return {
            ...messageObject,
            _id: messageObject._id.toString(),
            chatId: messageObject.chatId.toString(),
            sender: messageObject.sender.toString(),
            replyTo: messageObject.replyTo ? messageObject.replyTo.toString() : undefined,
            readBy: messageObject.readBy ? messageObject.readBy.map(item => ({
                ...item,
                userId: item.userId ? item.userId.toString() : null
            })) : [],
            reactions: messageObject.reactions ? messageObject.reactions.map(item => ({
                ...item,
                userId: item.userId ? item.userId.toString() : null
            })) : []
        } as IMessage;
        
    } catch (error: any) {
        throw new Error(error?.message || "Something went wrong!");
    }
};