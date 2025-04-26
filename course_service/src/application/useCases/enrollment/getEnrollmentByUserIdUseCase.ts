import { IDependencies } from "../../interfaces/IDepndencies";

export const getEnrollmentByUserIdUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { getEnrollmentByUserId }
    } = dependencies;

    return {
        execute: async (userId: string,page: number = 1,limit: number = 6,search: string = "") => {
            return await getEnrollmentByUserId(userId,page,limit,search);
        }
    }
    
};