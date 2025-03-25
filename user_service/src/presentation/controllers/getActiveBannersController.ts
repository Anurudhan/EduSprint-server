import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/utilities/common";

export const getActiveBannersController = (dependencies: IDependencies) => {
  const {
    useCases: { getActiveBannersUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("this is the page")
      const result = await getActiveBannersUseCase(dependencies).execute();
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
