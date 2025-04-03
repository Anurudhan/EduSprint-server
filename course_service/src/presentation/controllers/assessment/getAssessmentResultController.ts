import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { constant, httpStatusCode } from "../../../_lib/http";

export const getAssessmentResultController = (dependencie:IDependencies)=>{
    const {useCases:{getAssessmentResultByEnrollmentIdUseCase}} = dependencie;
    return async(req:Request,res:Response,next:NextFunction) =>{
        try {
            const enrollmentId = req.query.enrollmentId as string 
            console.log(enrollmentId,"this is the data get from the user side")
            if(!enrollmentId){
                res.status(httpStatusCode.UNAUTHORIZED).json({success:false,data:null,message:"there is not enrollementId"});
            }
            const result = await getAssessmentResultByEnrollmentIdUseCase(dependencie).execute({enrollmentId});
            if(!result){
                res.status(httpStatusCode.UNAUTHORIZED).json({success:false,data:null,message:"the result geting is failesd"});
            }
            res.status(httpStatusCode.OK).json({success:true,data:result,message:"The get the assessment result propperly"});
        } catch (error : unknown) {
            next(error)
        }
    }
}