
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";

export const getAllStudentsController = (dependencies: IDependencies) => {
    const {
        useCases: { getAllStudentsUsecase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            let page = parseInt(req.query.page as string, 10);
            let limit = parseInt(req.query.limit as string, 10) ;

            console.log(page,limit,"hee heee I am the Decider");
        

            const result = await getAllStudentsUsecase(dependencies).execute(page, limit);
            console.log(result)

            res.status(200).json({
                success: true,
                data: result,
                message: "All instructors fetched"
            });
        } catch (error) {
            next(error);
        }
    }
}