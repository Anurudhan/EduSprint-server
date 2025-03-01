import mongoose from "mongoose";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { IndividualChatEntity } from "../../../domain/entities";
import { Chat } from "../model";

export const createChat = async (data: IndividualChatEntity) => {
	try {
		// Ensure participants is an array and convert each ID to ObjectId
		const objectIdParticipants = data.participants?.map(id => {
			if(typeof id == "string"){
			if (mongoose.Types.ObjectId.isValid(id)) {
				return new mongoose.Types.ObjectId(id);
			} else {
				console.log("this is error of the Object id")
				throw new Error(`Invalid ObjectId: ${id}`);
			}
		}
		});

		// Create a new chat with ObjectId participants
		const chat = await Chat.create({ ...data, participants: objectIdParticipants });

		console.log("Chat created successfully:", chat);

		if (!chat) {
			throw new ErrorResponse(500, "Failed to create chat.");
		}

		return chat.toObject() as IndividualChatEntity;
	} catch (error: any) {
		throw ErrorResponse.internalError(error?.message || "Something went wrong!");
	}
};
