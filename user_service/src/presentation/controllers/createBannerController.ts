import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import updateUserProducer from "../../infrastructure/kafka/Producer/updateUserProducer";
import { httpStatusCode } from "../../_lib/utilities/common";



export const createBannerController = (dependencies: IDependencies) => {
	const {
		useCases: {createBannerUseCase },
	} = dependencies;
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body
			const result = await createBannerUseCase(dependencies).execute(data);
			console.log(data,"thisi is the data in controller")

			if (!result) {
				void res.status(httpStatusCode.UNAUTHORIZED).json({
					success: false,
					data: result,
					message: "User Profile updating failed!",
				});
				return;
			}
			void res.status(httpStatusCode.OK).json({
				success: true,
				data: result,
				message: "User Profile updated.",
			});
			return;

		} catch (error: any) {
			next(error);
		}
	};
};