import mongoose from "mongoose";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { IChat } from "../../../domain/entities";
import { Chat } from "../model";

export const createChat = async (data: IChat): Promise<IChat | null> => {
    try {
        // Create a properly formatted object for MongoDB
        const chatData = {
            ...data,
            // Convert string _id to ObjectId if it exists
            _id: data._id ? new mongoose.Types.ObjectId(data._id.toString()) : undefined,
            
            // Convert string participant IDs to ObjectIds
            participants: data.participants.map(id => 
                new mongoose.Types.ObjectId(id.toString())
            ),
            
            // Convert string admin IDs to ObjectIds if they exist
            admins: data.admins ? data.admins.map(id => 
                new mongoose.Types.ObjectId(id.toString())
            ) : undefined,
            
            // Convert userId in unreadCount to ObjectId with null checking
            unreadCount: data.unreadCount ? data.unreadCount.map(item => ({
                ...item,
                userId: item.userId ? new mongoose.Types.ObjectId(item.userId.toString()) : null
            })) : []
        };

        // Create a new chat with converted ObjectIds
        const chat = await Chat.create(chatData);

        console.log("Chat created successfully:", chat);

        // Convert Mongoose document back to plain object for return
        if (chat) {
            const chatObject = chat.toObject();
            
            // Convert ObjectIds back to strings for the domain layer
            return {
                ...chatObject,
                _id: chatObject._id.toString(),
                participants: chatObject.participants.map(id => id.toString()),
                admins: chatObject.admins ? chatObject.admins.map(id => id.toString()) : undefined,
                unreadCount: chatObject.unreadCount.map(item => ({
                    ...item,
                    userId: item.userId ? item.userId.toString() : null
                }))
            } as IChat;
        }
        
        return null;
    } catch (error: any) {
        throw ErrorResponse.internalError(error?.message || "Something went wrong!");
    }
};