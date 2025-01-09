import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";

export const getAllCourseController = (dependencie: IDependencies) => {
  const {
    useCases: { getAllCourseUseCase },
  } = dependencie;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, filters } = req.query;
      const parsedFilters = filters ? JSON.parse(filters as string) : {};

      const response = await getAllCourseUseCase(dependencie).execute({
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),filters: parsedFilters});
        console.log(response,"This is my data")

        if(response) res.status(httpStatusCode.OK).json({success:true,message:"get all courses ", data:{...response}})
        else res.status(httpStatusCode.OK).json({success:true,message:"NO data",data:{}}) 
    } catch (error: unknown) {
      if (error instanceof Error) next(error.message);
      else next();
    }
  };
};
