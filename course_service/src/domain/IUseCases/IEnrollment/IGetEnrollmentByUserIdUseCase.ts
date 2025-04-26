import { EnrollmentEntity } from "../../entities/EnrollmentEntity";

export interface IGetEnrollmentByUserIdUseCase {
    execute(userId: string,
        page: number,
        limit: number,
        search: string ): Promise<{ enrollment: EnrollmentEntity[], totalEnrollments: number,completedCount:number,progressCount:number } | null>;
}