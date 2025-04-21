import { CustomError } from "../../_lib/utilities/common/CustomError";
import { IDependencies } from "../Interfaces/IDependencies";


export const getAllInstructorsUseCase = (dependencies: IDependencies) => {
	const {
		repositories: { getAllInstructors },
	} = dependencies;
	return {
		execute: async (page?: number, limit?: number,search?:string) => {
			try {
				return await getAllInstructors(page, limit,search);
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