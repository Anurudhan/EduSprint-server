import { Types } from "mongoose";
import { Chat } from "../model";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { ChatType, IndividualChatEntity } from "../../../domain/entities";

export const getChatsByUserId = async (userId: string | Types.ObjectId) => {
  try {
    if (!userId) return null;
    const ObjectId =
      typeof userId == "string" ? [new Types.ObjectId(userId)] : [userId];

    const chats = await Chat.find({
      type: ChatType.individual,
      participants: { $in: ObjectId },
    });

    if (!chats) {
      return null
    }

    return chats as IndividualChatEntity[];
  } catch (error: any) {
    throw ErrorResponse.internalError(
      error?.message || "Something went wrong!"
    );
  }
};
