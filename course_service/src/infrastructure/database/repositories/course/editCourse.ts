import { CustomError } from "../../../../_lib/http/CustomError";
import { CourseEntity } from "../../../../domain/entities";
import { Course } from "../../models/courseModel";
export const editCourse = async (data: CourseEntity) => {
	try {
		console.log(data._id, "this is our ID for the user updating");

		if (!data._id) {
			throw new CustomError("Course ID is required for editing.", 400);
		}

		// ✅ Check if a course with same title and categoryRef exists (excluding current one)
		const existingCourse = await Course.findOne({
			title: data.title,
			categoryRef: data.categoryRef,
			_id: { $ne: data._id } // exclude the current course from check
		});

		if (existingCourse) {
			throw new CustomError("A course with the same title already exists in this category.", 409);
		}

		const updatedCourse = await Course.findByIdAndUpdate(
			data._id,
			{ $set: data },
			{ new: true, runValidators: true }
		);

		if (!updatedCourse) {
			throw new CustomError("Course not found or update failed.", 404);
		}

		return updatedCourse;
	} catch (error: any) {
		if (error instanceof CustomError) {
			throw error;
		}
		throw new CustomError(error.message || "An unexpected error occurred in editCourse.", 500);
	}
};
