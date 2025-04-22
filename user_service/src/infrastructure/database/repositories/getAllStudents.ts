import { CustomError } from "../../../_lib/utilities/common/CustomError";
import { Role, UserEntity } from "../../../domain/entities/UserEntity"; 
import { User } from "../models/userModel";

export interface StudentQueryResult {
	data: UserEntity[];
	totalCount: number;
	totalPages: number;
}

export const getAllStudents = async (
	page?: number,
	limit?: number,
	search?: string
): Promise<StudentQueryResult> => {
	try {
		const query: any = { role: Role.student,isVerified:true };

		if (search && search.trim() !== "") {
			const searchRegex = new RegExp(search.trim(), "i");
			query.$or = [
				{ userName: { $regex: searchRegex } },
				{ email: { $regex: searchRegex } }
			];
		}

		const totalCount = await User.countDocuments(query);
		
		let students: UserEntity[];

		if (!page || !limit) {
			students = await User.find(query).sort({ updatedAt: "descending" });
			return {
				data: students,
				totalCount,
				totalPages: 1
			};
		}

		const skipNo = (page - 1) * limit;

		students = await User.find(query)
			.sort({ updatedAt: "descending" })
			.skip(skipNo)
			.limit(limit);

		const totalPages = Math.ceil(totalCount / limit);

		return {
			data: students,
			totalCount,
			totalPages
		};
	} catch (error: any) {
		throw new CustomError(error?.message || "Failed to fetch students", 500);
	}
};
