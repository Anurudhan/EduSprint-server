import { AssessmentEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDepndencies";

export const  createAssessmentUseCase = (dependencie:IDependencies)=>{
    const {repositories:{createAssessment}} = dependencie;
    return {
        execute:async(data:AssessmentEntity)=>{
            const result = await createAssessment(data)
            return result;
        }
    }
}