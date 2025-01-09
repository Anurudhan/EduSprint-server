import { Types } from "mongoose";
import { Course } from "../../models/courseModel";

export const getCourseById = async(id:string) =>{
    try {
        const course = await Course.aggregate([
            {
              $match: { _id: new Types.ObjectId(id) }, // Match the course by its ID
            },
            {
              $lookup: {
                from: "categories", // The collection name of the Category model
                localField: "categoryRef", // The field in the Course model (which is a reference to Category)
                foreignField: "_id", // The field in the Category model to match with localField
                as: "category", // The new field to store the populated data
              },
            },
            {
              $unwind: { path: "$category", preserveNullAndEmptyArrays: true }, // Flatten the category array to an object
            },
          ]);
      
        return course.length > 0 ? course[0] : null; 
        
    } catch (error:unknown) {
        if(error instanceof Error) throw new Error(error.message);
        else throw new Error("An unknown error");
    }
}