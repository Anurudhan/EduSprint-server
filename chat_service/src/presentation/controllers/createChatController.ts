
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";

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
                throw new Error("Chat creation failed!");
            }

            res.status(200).json({
                success: true,
                data: result,
                message: "Chat created!"
            });

        } catch (error) {
            next(error);
        }
    }
}