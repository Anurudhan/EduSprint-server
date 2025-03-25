import {  AssessmentResult } from "../../entities";


export interface ICreateAssessmentResultUseCase {
    execute(data:AssessmentResult) : Promise <AssessmentResult|null>;
}