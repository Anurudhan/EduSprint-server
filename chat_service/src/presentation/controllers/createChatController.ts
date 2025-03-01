
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common";

export const createChatController = (dependencies: IDependencies) => {

    const {
        usecases: { createChatUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const data = req.body;

            console.log(data,"this data");
            

            const result = await createChatUseCase(dependencies)
                .execute(data);

            if (!result) {
                res.status(httpStatusCode.UNAUTHORIZED).json({success: false,data:result, message: "Occure an unauthorized error." });
            }

            res.status(httpStatusCode.OK).json({
                success: true,
                data: result,
                message: "Chat created!"
            });

        } catch (error) {
            next(error);
        }
    }
}