import { AssessmentEntity } from "../../entities";

export interface IGetAssessmentByLessonIdUseCase {
    execute({ courseId, lessonId }: { courseId: string; lessonId: string }) : Promise <AssessmentEntity|null>;
}