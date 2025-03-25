import { Types } from "mongoose";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { Chat } from "../model";
import { IChat } from "../../../domain/entities";

export const getChatById = async (id: string): Promise<IChat | null> => {
    try {
        if (!id) {
            return null;
        }
        
        const objectId = new Types.ObjectId(id);
        const chat = await Chat.findById(objectId);
        
        if (!chat) return null;
        
        // Transform to ensure type compatibility with IChat interface
        const chatObj = chat.toObject();
        
        // Ensure unreadCount is properly mapped
        const transformedChat: IChat = {
            ...chatObj,
            unreadCount: chatObj.unreadCount.map(item => ({
                userId: item.userId || null, // Handle the possibility of undefined
                count: item.count
            }))
        };
        
        return transformedChat;
    } catch (error: any) {
        throw ErrorResponse.internalError(error?.message || "Something went wrong!");
    }
};