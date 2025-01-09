import { filterEntity } from "../../../../domain/entities";
import mongoose from "mongoose";
import { Category } from "../../models/categoryModel";
import { Course } from "../../models/courseModel";

export const getAllCourse = async (data: {
  page?: number;
  limit?: number;
  filters?: filterEntity;
}) => {
  try {
    const query: any = {};
    const { page = 1, limit = 0, filters } = data;
    console.log(filters?.priceType,"this is type")

    if (filters?.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } },
      ];

      const matchingCategories = await Category.find({
        name: { $regex: filters.search, $options: "i" },
        status: { $ne: "blocked" },
      });

      if (matchingCategories.length > 0) {
        query.$or.push({
            categoryRef: { $in: matchingCategories.map((cat) => cat._id) },
        });
      }
    }

    if (filters?.category) {
      if (mongoose.Types.ObjectId.isValid(filters.category)) {
        query.categoryRef = filters.category;
      } else {
        const matchingCategory = await Category.findOne({
          name: { $regex: filters.category, $options: "i" },
          status: { $ne: "blocked" },
        });
        if (matchingCategory) {
          query.categoryRef = matchingCategory._id;
        }
      }
    }

    if (filters?.priceType === "free") query["pricing.type"] = "free";
    if (filters?.priceType === "paid") {
      query["pricing.type"] = "paid";
      if (filters?.minPrice)
        query["pricing.amount"] = { $gte: filters.minPrice };
      if (filters.maxPrice)
        query["pricing.amount"] = {
          ...(query["pricing.amount"] || {}),
          $lte: filters.maxPrice,
        };
    }
    if (filters?.level) query.level = filters.level;
    if (filters?.minRating) query.rating = { $gte: filters.minRating };
    query.isBlocked = { $ne: true };

    const totalCourses = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .sort({ updatedAt: "descending" })
      .skip((page - 1) * limit)
      .limit(limit);

    return { courses, totalCourses };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("unkown error");
  }
};
