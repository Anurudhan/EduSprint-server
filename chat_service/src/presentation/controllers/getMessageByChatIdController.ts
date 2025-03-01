import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";

export const getMessagesByChatIdController = (dependencies: IDependencies) => {

    const {
        usecases: { getMessagesByChatIdUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const id = req.params?.chatId;

            const result = await getMessagesByChatIdUseCase(dependencies)
                .execute(id);

            if (!result) {
                res.status(200).json({
                    success: true,
                    data: null,
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