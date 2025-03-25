import { Types } from "mongoose";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { IChat, ChatType } from "../../../domain/entities";
import { Chat } from "../model";

export const existingChat = async (data: IChat): Promise<IChat | null> => {
    try {
        if (data.chatType !== ChatType.individual || data.participants.length !== 2) {
            return null;
        }
        
        // Convert participants to ObjectId if they are strings
        const participantIds = data.participants.map(id => 
            typeof id === "string" ? new Types.ObjectId(id) : id
        );
        
        const chat = await Chat.findOne({
            chatType: ChatType.individual,
            "participants": { $all: participantIds }
        });
        
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