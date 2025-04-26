
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";

export const    getEnrollmentByUserIdController = (dependancies: IDependencies) => {
    const { useCases: {getEnrollmentByUserIdUseCase} } = dependancies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const {userId} = req.params;
            const { page = 1, limit = 6, search = '' } = req.query;
            console.log(search,"this is user Id")

            const result = await getEnrollmentByUserIdUseCase(dependancies)
                .execute(userId,Number(page), Number(limit), search as string);
                console.log(result, " this  is the result of the enrollment")
                if(result  === null){
                    res.status(404).json({
                        success: false,
                        data: result,
                        message: "Enrollment data not fount"
                    });
        
                }
            res.status(200).json({
                success: true,
                data: result?.enrollment,
                totalEnrollments:result?.totalEnrollments,
                progressCount:result?.progressCount,
                completedCount:result?.completedCount,
                message: "Enrollment retrieved!"
            });

        } catch (error) {
            next(error);
        }
    }
}