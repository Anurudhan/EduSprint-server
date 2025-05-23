import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";
import { httpStatusCode } from "../../../_lib/http";
import { CustomError } from "../../../_lib/http/CustomError";

export const updateCourseController = (dependencie: IDependencies) => {
  const { useCases: { updateCourseUseCase } } = dependencie;
  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body, "\n Here the data for the update course");
      const result = await updateCourseUseCase(dependencie).execute(req.body);
      
      if (!result) {
        res.status(httpStatusCode.BAD_REQUEST).json({success:false,message:"course updating time occure an error!"})
      }

      // Respond with success message using CustomError
      res.status(httpStatusCode.OK).json({
        success: true,
        message: "Course updated successfully!",
        data: result
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        // Catch and handle custom error
        console.log(error.message,"this is error we passing")
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          data: ""
        });
      } else if (error instanceof Error) {
        // Catch generic errors
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message,
          data: ""
        });
      } else {
        // Handle unexpected errors
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "An unknown error occurred.",
          data: ""
        });
      }
    }
  };
};
