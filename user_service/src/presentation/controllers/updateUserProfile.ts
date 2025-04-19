import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import updateUserProducer from "../../infrastructure/kafka/Producer/updateUserProducer";
import { UserEntity } from "../../domain/entities/UserEntity";

export const updateUserProfile = (dependencies: IDependencies) => {
	const {
		useCases: { updateUserProfileUseCase },
	} = dependencies;

	return async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
		try {
			const value = req.body;
			const result = await updateUserProfileUseCase(dependencies).execute(value.data);

			if (!result) {
				 res.status(400).json({
					success: false,
					data: result,
					message: "User profile updating failed!",
				});
			}

			await updateUserProducer(result as UserEntity);

			 res.status(200).json({
				success: true,
				data: result,
				message: "User profile updated.",
			});

		} catch (error: any) {
			// If error has a custom status code or message, use it; otherwise, fall back to default
			const statusCode = error.statusCode || 500;
			const message = error.message || "Something went wrong while updating the profile.";

			 res.status(statusCode).json({
				success: false,
				message,
				error: process.env.NODE_ENV === "development" ? error : undefined, // hide error details in production
			});
		}
	};
};
