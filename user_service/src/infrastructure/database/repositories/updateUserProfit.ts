import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models/userModel";


export const updateUserProfit = async (
	userId: string,
	amount: number
): Promise<UserEntity | null> => {
	try {
		const instructorProfit = Math.trunc(amount * 0.7);
		const adminProfit = Math.trunc(amount * 0.3);
		const user = await User.findById(userId);
		if(user?.profit === null){
			User.findByIdAndUpdate(
				userId,
				{ $set: { profit: 0 } },
				{ new: true }
			  );
			  
		}		
		const updateInstructorProfit = await User.findByIdAndUpdate(
			userId,
			{ $inc: { profit: instructorProfit } },
			{ new: true }
		);

		await User.findOneAndUpdate(
			{ role: "admin" },
			{ $inc: { profit: adminProfit } },
			{ new: true }
		);

		return updateInstructorProfit;
	} catch (error: any) {
		console.error("Error updating user profit:", error);
		throw new Error(error?.message);
	}
};