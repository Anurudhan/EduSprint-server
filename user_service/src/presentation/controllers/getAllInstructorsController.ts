
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import { CustomError } from "../../_lib/utilities/common/CustomError";

export const getAllInstructorsController = (dependencies: IDependencies) => {
    const {
        useCases: { getAllInstructorsUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
			const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
			const search = req.query.search ? (req.query.search as string) : "";


            const result = await getAllInstructorsUseCase(dependencies).execute(page, limit,search);
            if (result.data.length === 0) {
                res.status(200).json({
                  success: true,
                  message: "No students found",
                  data: [],
                  totalCount: 0,
                  totalPages: 1,
                });
              }
              
              res.status(200).json({
                success: true,
                message: "Students fetched successfully",
                data:result.data,
                totalCount:result.totalCount,
                totalPages:result.totalPages,
              });
        } catch (error:any) {
           if (error instanceof CustomError) {
                return next(error);
            } else {
                return next(new CustomError(error.message || "Something went wrong", 500));
            }
        }
    }
}