import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import { CustomError } from "../../_lib/utilities/common/CustomError";
import { httpStatusCode } from "../../_lib/utilities/common";
 // Adjust path as necessary

export const getAllStudentsController = (dependencies: IDependencies) => {
	const {
		useCases: { getAllStudentsUsecase }
	} = dependencies;

	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
			const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
			const search = req.query.search ? (req.query.search as string) : "";
            console.log(page,limit,"this are the page and limit in this call")
			const result = await getAllStudentsUsecase(dependencies).execute(page, limit, search);
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
		} catch (error: any) {
			if (error instanceof CustomError) {
			    next(error);
			} else {
				next(new CustomError(error.message || "Something went wrong", 500));
			}
		}
	};
};
