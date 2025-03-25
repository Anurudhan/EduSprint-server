import { EnrollmentEntity } from "../../entities/EnrollmentEntity";


export interface IGetEnrollmentByIdUseCase {
    execute(enrollmentId: string): Promise<EnrollmentEntity | null>;
}