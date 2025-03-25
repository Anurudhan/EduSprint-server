
import { IDependencies } from "../../interfaces/IDepndencies";

export const  getAssessmentResultByEnrollmentIdUseCase = (dependencie:IDependencies)=>{
    const {repositories:{getAssessmentResultByEnrollmentId}} = dependencie;
    return {
        execute:async({enrollmentId}:{enrollmentId:string})=>{
            const result = await getAssessmentResultByEnrollmentId({enrollmentId})
            return result;
        }
    }
}