
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";

export const getAllInstructorsController = (dependencies: IDependencies) => {
    const {
        useCases: { getAllInstructorsUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            let page = parseInt(req.query.page as string, 10);
            let limit = parseInt(req.query.limit as string, 10) ;

            if (!req.query.page) {
                page = 1;
            }
            if(!req.query.limit){
                limit = 100;
            }

            const result = await getAllInstructorsUseCase(dependencies).execute(page, limit);
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