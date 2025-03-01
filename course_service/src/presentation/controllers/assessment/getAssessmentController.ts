import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { constant, httpStatusCode } from "../../../_lib/http";

export const getAssessmentController = (dependencie:IDependencies)=>{
    const {useCases:{getAssessmentByLessonIdUseCase,getAssessmentByCourseIdUseCase}} = dependencie;
    return async(req:Request,res:Response,next:NextFunction) =>{
        try {
            const courseId = req.query.courseId as string
            const lessonId = req.query.lessonId as string 
            let result ;
            console.log(courseId,lessonId,"this is the data get from the user side")
            if(!lessonId&&courseId){
                console.log("hey I am here")
                 result = await getAssessmentByCourseIdUseCase(dependencie).execute({courseId})
            }
            else result = await getAssessmentByLessonIdUseCase(dependencie).execute({courseId,lessonId})
            console.log(result,"there is our data")
            if(!result){
                res.status(httpStatusCode.BAD_REQUEST).json({success:false,data:null,message:constant.getAsssessmentByLessonIdfailed});
                return
            }
            res.status(200).json({success:true,data:result,message:constant.getAsssessmentByLessonId});
        } catch (error : unknown) {
            next(error)
        }
    }
}