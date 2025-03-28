import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { constant, httpStatusCode } from "../../../_lib/http";

export const createAssessmentResultController = (dependencie:IDependencies)=>{
    const {useCases:{createAssessmentResultUseCase}} = dependencie;
    return async(req:Request,res:Response,next:NextFunction) =>{
        try {
            const result = await createAssessmentResultUseCase(dependencie).execute(req.body)
            if(!result){
                res.status(httpStatusCode.BAD_REQUEST).json({success:false,data:null,message:constant.createAssessmentfailed});
            }
            res.status(200).json({success:true,data:result,message:constant.createAssessmentsuccess});
        } catch (error : unknown) {
            next(error)
        }
    }
}