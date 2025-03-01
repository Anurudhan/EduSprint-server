import { Types } from "mongoose";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { IndividualChatEntity, ChatType } from "../../../domain/entities";
import { Chat } from "../model";

export const getChatById = async (Id: string) => {
    try {
        if (!Id) {
            return null;
        }
        const ObjectId = new Types.ObjectId(Id)
        
        const chat = await Chat.findById(ObjectId)

        return chat?chat as IndividualChatEntity :null;
    } catch (error: any) {
        throw ErrorResponse.internalError(error?.message || "Something went wrong!");
    }
};