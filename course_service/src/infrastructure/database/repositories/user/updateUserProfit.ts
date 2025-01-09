import { UserEntity } from "../../../../domain/entities";
import { User } from "../../models/userModel";

export const updateUserProfit = async (
	userId: string,
	amount: number
): Promise<UserEntity | null> => {
	try {
		const instructorProfit = Math.trunc(amount * 0.7);
		const adminProfit = Math.trunc(amount * 0.3);

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
	} catch (error: unknown) {
        if(error instanceof Error){
            console.error("Error updating user profit:", error);
            throw new Error(error?.message);
        }
        else{
            console.error("Error updating user profit:", error);
            throw new Error("An un known error");
        }
	}
};