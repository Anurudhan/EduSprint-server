import { AssessmentEntity, AssessmentResult } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDepndencies";

export const  createAssessmentResultUseCase = (dependencie:IDependencies)=>{
    const {repositories:{createAssessmentResult}} = dependencie;
    return {
        execute:async(data:AssessmentResult)=>{
            const result = await createAssessmentResult(data)
            return result;
        }
    }
}