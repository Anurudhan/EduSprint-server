
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";

export const getEnrollmentByUserIdController = (dependancies: IDependencies) => {
    const { useCases: {getEnrollmentByUserIdUseCase} } = dependancies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const {userId} = req.params;
            console.log(userId,"this is user Id")

            const result = await getEnrollmentByUserIdUseCase(dependancies)
                .execute(userId);
                if(result  === null){
                    res.status(404).json({
                        success: false,
                        data: result,
                        message: "Enrollment data not fount"
                    });
        
                }
            res.status(200).json({
                success: true,
                data: result,
                message: "Enrollment retrieved!"
            });

        } catch (error) {
            next(error);
        }
    }
}