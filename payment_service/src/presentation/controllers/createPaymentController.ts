import { IDependencies } from "../../application/interface/IDependencie";
import { Request, Response, NextFunction } from "express";
import coursePurchaseSuccessProducer from "../../infrastructure/kafka/producer/coursePurchaseSuccessProducer";


export const createPaymentController = (dependencies: IDependencies) => {
    const { useCases: {createPaymentUseCase} } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const { instructorId, ...data } = req.body;

            console.log(req.body,"text purchase");
            

            const result = await createPaymentUseCase(dependencies).execute(req.body)
            console.log(result,"\n this is saving data of the payment ======================>");
            if (!result) {
                throw new Error("payment failed!");
            }

            const producerData = {
                studentId: result.userId.toString(),
                courseId: result.courseId.toString(),
                amount: result.amount,
                instructorId
            }

            // create payment producer
            await coursePurchaseSuccessProducer(producerData)

            res.status(200).json({
                success: true,
                data: result,
                message: "payment success!"
            });

        } catch (error: any) {
            next(error)
        }
    }
}