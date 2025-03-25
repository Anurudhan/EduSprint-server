import mongoose, { Types } from "mongoose";
import { Message } from "../model";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { IMessage, contentType } from "../../../domain/entities";

export const getMessagesByChatId = async (chatId: string | Types.ObjectId): Promise<IMessage[] | null> => {
  try {
    if (!chatId) return null;
    const objectId = typeof chatId === "string" ? new Types.ObjectId(chatId) : chatId;

    const messages = await Message.find({ chatId: objectId }).sort({ createdAt: 1 });

    if (!messages || messages.length === 0) return null;

    // Transform to ensure type compatibility with IMessage interface
    const transformedMessages: IMessage[] = messages.map(message => {
      const messageObj = message.toObject();
      
      // Ensure contentType is mapped to the enum
      return {
        ...messageObj,
        contentType: messageObj.contentType as contentType,
      } as IMessage;
    });

    console.log(transformedMessages,"this is the transform messages")

    return transformedMessages;
  } catch (error: any) {
    throw ErrorResponse.internalError(
      error?.message || "Something went wrong while fetching messages!"
    );
  }
};