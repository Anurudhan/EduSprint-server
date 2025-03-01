import { AssessmentEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDepndencies";

export const  updateAssessmentUseCase = (dependencie:IDependencies)=>{
    const {repositories:{updateAssessment}} = dependencie;
    return {
        execute:async(data:AssessmentEntity)=>{
            const result = await updateAssessment(data)
            return result;
        }
    }
}