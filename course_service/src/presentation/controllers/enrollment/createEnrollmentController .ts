
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDepndencies";

export const createEnrollmentController = (dependencies: IDependencies) => {
	const {
		useCases: { createEnrollmentUseCase, getEnrollmentByUserIdUseCase },
	} = dependencies;

	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const enrollments = await getEnrollmentByUserIdUseCase(
				dependencies
			).execute(req.body?.userId,1,1000,"");
			const existingEnrollment = enrollments?.enrollment.find(
				(item) =>
					item.courseId._id.toString() === req.body?.courseId?.toString()
			);
			if (existingEnrollment) {
				 res.status(200).json({
					success: false,
					data: {},
					message: "You have already enrolled to this course!",
				});
			}
			const result = await createEnrollmentUseCase(dependencies).execute(
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