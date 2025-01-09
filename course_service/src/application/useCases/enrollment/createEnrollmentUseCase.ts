import { EnrollmentEntity } from "../../../domain/entities"
import { IDependencies } from "../../interfaces/IDepndencies"


export const createEnrollmentUseCase = (dependecies: IDependencies) => {
    const { repositories: {createEnrollment} } = dependecies
    return {
        execute: async (data: EnrollmentEntity) => {
            return await createEnrollment(data)
        }
    }
}