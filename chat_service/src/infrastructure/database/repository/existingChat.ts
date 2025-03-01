import { Types } from "mongoose";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { IndividualChatEntity, ChatType } from "../../../domain/entities";
import { Chat } from "../model";

export const existingChat = async (data: IndividualChatEntity) => {
    try {
        if (data.type !== ChatType.individual || data.participants.length !== 2) {
            return null;
        }

        
        const participantIds = data.participants.map(p => {
            if (typeof p === "string") {
                return new Types.ObjectId(p);
            } else if (p && p._id) {
                return typeof p._id === "string" ? new Types.ObjectId(p._id) : p._id;
            }
            return null;
        }).filter(id => id !== null);
        
        const chat = await Chat.findOne({
            type: ChatType.individual,
            "participants": { $all: participantIds }
        })

        return chat?chat as IndividualChatEntity :null;
    } catch (error: any) {
        throw ErrorResponse.internalError(error?.message || "Something went wrong!");
    }
};