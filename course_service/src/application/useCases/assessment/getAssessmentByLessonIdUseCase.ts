import { AssessmentEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDepndencies";

export const  getAssessmentByLessonIdUseCase = (dependencie:IDependencies)=>{
    const {repositories:{getAssessmentByLessonId}} = dependencie;
    return {
        execute:async({courseId,lessonId}:{courseId:string,lessonId:string})=>{
            const result = await getAssessmentByLessonId({courseId,lessonId})
            return result;
        }
    }
}