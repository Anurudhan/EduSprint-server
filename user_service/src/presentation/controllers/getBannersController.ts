import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/utilities/common";

export const getBannersController = (dependencies: IDependencies) => {
  const {
    useCases: { getBannersUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      console.log("this is the page number",page)
      const result = await getBannersUseCase(dependencies).execute(page, limit);
      if(!result){
        res.status(httpStatusCode.UNAUTHORIZED).json({
            success: false,
            data: result,
            message: "All instructors fetched",
          });
      }
      res.status(httpStatusCode.OK).json({
        success: true,
        data: result,
        message: "All instructors fetched",
      });
    } catch (error) {
      next(error);
    }
  };
};
