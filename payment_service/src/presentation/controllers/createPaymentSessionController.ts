import { IDependencies } from "../../application/interface/IDependencie";
import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { httpStatusCode } from "../../_lib/http/httpStatusCode";

export const createPaymentSessionController = (dependencies: IDependencies) => {
    const { useCases: {createSessionUseCase} } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {


            if (!process.env.STRIPE_SECRET_KEY) {
                console.log("Stripe secret key is not found in env");
                res.status(500).json(
                    {success:false,message:"Internal server error: Stripe secret key is missing",data:{}});
            }

            const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-11-20.acacia' });

            const { courseName, courseThumbnail, userId, courseId, amount } = req.body;

            const data = [
                {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: courseName,
                            images: [courseThumbnail],
                        },
                        unit_amount: Math.floor(amount * 100)
                    },
                    quantity: 1
                }
            ];

            const session = await stripeInstance.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: data,
                mode: "payment",
                success_url: `${process.env.FRONTEND_URL}/payment-success`,
                cancel_url: `${process.env.FRONTEND_URL}/payment-failed`
            });

            const result = await createSessionUseCase(dependencies).execute({
                userId,
                courseId,
                sessionId: session.id
            });

            res.status(httpStatusCode.OK).json({
                success: true,
                data: result,
                message: "session created!"
            });
        } catch (error: any) {
            next(error)
        }
    }
}