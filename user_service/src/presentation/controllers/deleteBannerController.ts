import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import updateUserProducer from "../../infrastructure/kafka/Producer/updateUserProducer";
import { httpStatusCode } from "../../_lib/utilities/common";



export const deleteBannerController = (dependencies: IDependencies) => {
	const {
		useCases: {deleteBannerUseCase },
	} = dependencies;
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const bannerId = req.params.bannerId as string
			const result = await deleteBannerUseCase(dependencies).execute(bannerId);

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