import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interface/IDependencie";

export const getPaymentsByUserIdController = (dependencies: IDependencies) => {
    const { useCases: {getPaymentsUserIdUseCase} } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const {userId} = req.params;
            console.log(userId,"This is user Id")
            const result  = await getPaymentsUserIdUseCase(dependencies).execute(userId)

            if(!result){
                res.status(200).json({
                    success: false,
                    message: "All Payments fetch failed"
                })
            }

         res.status(200).json({
                success: true,
                data: {...result},
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