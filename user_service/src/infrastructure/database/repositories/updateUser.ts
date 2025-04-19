import { ObjectId } from "mongodb";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models/userModel";
import { CustomError } from "../../../_lib/utilities/common/CustomError";

export const updateUser = async (value: UserEntity): Promise<UserEntity | null> => {
	try {
		const { _id, userName, ...fieldsToUpdate } = value;
		const objectId = new ObjectId(_id);

		// 🔍 Check if the new username already exists for a different user
		const existingUser = await User.findOne({ userName, _id: { $ne: objectId } });

		if (existingUser) {
			throw new CustomError("Username already exists. Please choose another one.", 409);
		}

		// ✅ Proceed to update if no username conflict
		const updatedUser = await User.findOneAndUpdate(
			{ _id: objectId },
			{ $set: { ...fieldsToUpdate, userName } }, // include userName in case it is being changed
			{ new: true, upsert: false }
		);

		if (!updatedUser) {
			throw new CustomError("User not found or update failed", 404);
		}

		return updatedUser as UserEntity;

	} catch (error: any) {
		if (error instanceof CustomError) {
			throw error;
		}
		throw new CustomError(error.message || "Error updating user", 500);
	}
};
