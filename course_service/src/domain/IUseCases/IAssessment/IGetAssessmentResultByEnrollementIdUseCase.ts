import { AssessmentResult } from "../../entities";

export interface IGetAssessmentResultByEnrollementIdUseCase {
    execute({ enrollmentId }: { enrollmentId: string }) : Promise <AssessmentResult[]|[]>;
}