
import { IDependencies } from "../../interfaces/IDepndencies";

export const  getAssessmentByCourseIdUseCase = (dependencie:IDependencies)=>{
    const {repositories:{getAssessmentByCourseId}} = dependencie;
    return {
        execute:async({courseId}:{courseId:string})=>{
            const result = await getAssessmentByCourseId({courseId})
            return result;
        }
    }
}