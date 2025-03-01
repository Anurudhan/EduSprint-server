
import { EnrollmentEntity } from "../../entities/EnrollmentEntity";

export interface IUpdateEnrollmentUseCase {
    execute(data: EnrollmentEntity): Promise <EnrollmentEntity | null>
}