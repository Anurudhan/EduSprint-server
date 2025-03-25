import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common";

export const getMessagesByChatIdController = (dependencies: IDependencies) => {

    const {
        usecases: { getMessagesByChatIdUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const id = req.query?.chatId as string;
            if(!id) res.json({success :false,message:"the retreving data must want the id", data:null}).status(httpStatusCode.UNAUTHORIZED)

            const result = await getMessagesByChatIdUseCase(dependencies)
                .execute(id);

            if (!result) {
                res.status(200).json({
                    success: true,
                    data: [],
                    message: "Messages retrieved!"
                });
                
            }

            res.status(200).json({
                success: true,
                data: result,
                message: "Messages retrieved!"
            });

        } catch (error) {
            next(error);
        }
    }
}