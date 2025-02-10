import ErrorResponse from "../../../_lib/common/errorResponse";
import { MessageEntity } from "../../../domain/entities";
import { Message } from "../model";


export const createMessage = async (data: MessageEntity) => {
	try {
		const message = await Message.create(data);

        if (!message) {
            throw ErrorResponse.internalError("Message creation error")
        }

		return message;
	} catch (error: any) {
		throw new Error(error?.message || "Something went wrong!");
	}
};