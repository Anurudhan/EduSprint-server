import { UserEntity } from "../../../../domain/entities";
import { User } from "../../models/userModel";


export const updateUser = async (
	data: UserEntity
): Promise<UserEntity | null> => {
	try {
		const { _id, ...rest } = data;

		const updatedUser = await User.findByIdAndUpdate(
			_id,
			{ $set: { ...rest } },
			{ new: true } 
		)

		if (!updatedUser) {
			throw new Error("Update user error");
		}

		return updatedUser as UserEntity;
	} catch (error: any) {
		if (error.code === 11000) {
			throw new Error("This username already exists");
		}
		throw new Error(error.message || "An unknown error occurred");
	}
};