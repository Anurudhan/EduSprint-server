import { EnrollmentEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDepndencies";

export const getEnrollmentByIdUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { getEnrollmentById }
    } = dependencies;

    return {
        execute: async (enrollmentId: string):Promise<EnrollmentEntity|null> => {

            return await getEnrollmentById(enrollmentId);
        }
    }
    
};