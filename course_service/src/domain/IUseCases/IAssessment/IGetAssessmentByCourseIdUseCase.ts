import { AssessmentEntity } from "../../entities";

export interface IGetAssessmentByCourseIdUseCase {
    execute({ courseId }: { courseId: string }) : Promise <AssessmentEntity[]|null>;
}