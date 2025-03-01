import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common";

export const getChatsByUserIdController = (dependencies:IDependencies) => {
    const {usecases:{getChatsByUserIdUseCase}} = dependencies;
    return async(req:Request,res:Response,next:NextFunction) =>{
        try {

            
            const {userId} = req.query;
            console.log("here the call of the get chat of user Id",userId)
            const result = await getChatsByUserIdUseCase(dependencies)
                .execute(userId as string);
            console.log(result,"this is result of the user")

            if (!result) {
                res.status(httpStatusCode.UNAUTHORIZED).json({
                    success: true,
                    data: result,
                    message: "Chats retrievel failed!"
                });
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