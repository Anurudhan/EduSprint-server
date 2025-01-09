import { IDependencies } from "../../interfaces/IDepndencies";

export const getEnrollmentByUserIdUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { getEnrollmentByUserId }
    } = dependencies;

    return {
        execute: async (userId: string) => {
            return await getEnrollmentByUserId(userId);
        }
    }
    
};