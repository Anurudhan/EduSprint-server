import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";

export const createMessageController = (dependencies:IDependencies) => {
    const {usecases:{createMessageUseCase}} = dependencies;
    return async (req:Request,res:Response,next:NextFunction) =>{
        try{

            const data = req.body;

            console.log("this is the data for creating message ",data)

            const result = await createMessageUseCase(dependencies)
                .execute(data);

            if (!result) {
                throw new Error("Message creation failed!");
            }

            res.status(200).json({
                success: true,
                data: result,
                message: "Message created!"
            });

        }
        catch(error:unknown){
            next(error)
        }
    }
}