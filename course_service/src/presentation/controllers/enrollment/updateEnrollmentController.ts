
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";

export const updateEnrollmentController = (dependencies: IDependencies) => {
	const {
		useCases: { updateEnrollmentUseCase },
	} = dependencies;

	return async (req: Request, res: Response, next: NextFunction) => {
		try {
            console.log(req.body,"\n Here the data for the update enrollment");
			const result = await updateEnrollmentUseCase(dependencies).execute(
				req.body
			);

			if (!result) {
				 res.status(200).json({
					success: false,
					data: {},
					message: "Enrollment creation failed!",
				});
			}

			res.status(200).json({
				success: true,
				data: result,
				message: "Enrollment created successfully!",
			});
		} catch (error: unknown) {
			next(error);
		}
	};
};