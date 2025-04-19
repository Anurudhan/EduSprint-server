import { CustomError } from "../../../../_lib/http/CustomError";
import { CourseEntity } from "../../../../domain/entities/courseEntity";
import { Category } from "../../models/categoryModel";
import { Course } from "../../models/courseModel";

export const addCourse = async (data: CourseEntity) => {
  try {
    // 1. Check if course with same title and categoryRef exists
    const existingCourse = await Course.findOne({
      title: data.title,
      categoryRef: data.categoryRef,
    });

    if (existingCourse) {
      throw new CustomError(
        "A course with the same title already exists in this category.",
        400
      );
    }

    // 2. Check if category exists
    const category = await Category.findById(data.categoryRef);
    if (!category) {
      throw new CustomError("Category not found!", 404);
    }

    // 3. Create course
    const result = await Course.create(data);
    if (!result) {
      throw new CustomError("Server failed when creating a new course!", 500);
    }

    // 4. Update course count in category
    const updatedCount = (category.count || 0) + 1;
    await Category.updateOne(
      { _id: data.categoryRef },
      { $set: { count: updatedCount } }
    );

    return result; // createdAt will be automatically available if timestamps are enabled
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      error.message || "An unexpected error occurred in addCourse.",
      500
    );
  }
};
