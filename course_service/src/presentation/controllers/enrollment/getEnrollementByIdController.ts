
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";

export const getEnrollmentByIdController = (dependancies: IDependencies) => {
    const { useCases: {getEnrollmentByIdUseCase} } = dependancies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const {enrollmentId} = req.params;

            const result = await getEnrollmentByIdUseCase(dependancies)
                .execute(enrollmentId);

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