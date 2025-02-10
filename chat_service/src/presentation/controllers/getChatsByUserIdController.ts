import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";

export const getChatsByUserIdController = (dependencies:IDependencies) => {
    const {usecases:{getChatsByUserIdUseCase}} = dependencies;
    return async(req:Request,res:Response,next:NextFunction) =>{
        try {
            const id = req.params?.userId;
            

            const result = await getChatsByUserIdUseCase(dependencies)
                .execute(id);

            if (!result) {
                throw new Error("Chats retrievel failed!");
            }

            res.status(200).json({
                success: true,
                data: result,
                message: "Chats retrieved!"
            });
            
        } catch (error:unknown) {
            next(error)
        }
    }
}