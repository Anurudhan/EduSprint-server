import { CustomError } from "../../_lib/utilities/common/CustomError";
import { IDependencies } from "../Interfaces/IDependencies";


export const getAllStudentsUsecase = (dependencies: IDependencies) => {
	const {
		repositories: { getAllStudents },
	} = dependencies;
	return {
		execute: async (page?: number, limit?: number,search?:string) => {
			try {
				return await getAllStudents(page, limit,search);
			} catch (error) {
				if (error instanceof Error) {
                    throw error; 
                }
                else if (error instanceof CustomError) {
                    throw error;
                }
                throw new Error("An unexpected error occurred in updateCourse.");
			}
			
		},
	};
};