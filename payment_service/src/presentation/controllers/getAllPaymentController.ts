import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interface/IDependencie";

export const getAllPaymentsController = (dependencies: IDependencies) => {
    const { useCases: {getAllPaymentUseCase} } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result  = await getAllPaymentUseCase(dependencies).execute()

            if(!result){
                res.status(200).json({
                    success: false,
                    message: "All Payments fetch failed"
                })
            }

         res.status(200).json({
                success: true,
                data: result,
                message: "all Payments fetched"
            })

        } catch (error: unknown) {
            if(error instanceof Error){
                next(error)
            }
            else{
                next("An unknown error")
            }
        }
    }
}