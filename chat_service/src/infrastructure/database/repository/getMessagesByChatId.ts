import { Types } from "mongoose";
import { Message } from "../model";
import ErrorResponse from "../../../_lib/common/errorResponse";


export const getMessagesByChatId = async (chatId: string | Types.ObjectId) => {
	try {
		const messages = Message.find({
			chatId: chatId,
		});

		return messages;
	} catch (error: any) {
		throw ErrorResponse.internalError(error?.message || "Something went wrong!");
	}
};