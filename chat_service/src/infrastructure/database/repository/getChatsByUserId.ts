import { Types } from "mongoose";
import { Chat } from "../model";
import ErrorResponse from "../../../_lib/common/errorResponse";


export const getChatsByUserId = async (userId: string | Types.ObjectId) => {
	try {
		const chats = await Chat.find({ participants: userId }).populate('participants')

		if (!chats) {
			throw ErrorResponse.internalError(" get Chat by userId error");
		}

		return chats;
	} catch (error: any) {
		throw ErrorResponse.internalError(
			error?.message || "Something went wrong!"
		);
	}
};