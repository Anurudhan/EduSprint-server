import { EnrollmentEntity } from "../../../domain/entities"
import { IDependencies } from "../../interfaces/IDepndencies"


export const updateEnrollmentUseCase = (dependecies: IDependencies) => {
    const { repositories: {updateEnrollment} } = dependecies
    return {
        execute: async (data: EnrollmentEntity) => {
            return await updateEnrollment(data)
        }
    }
}