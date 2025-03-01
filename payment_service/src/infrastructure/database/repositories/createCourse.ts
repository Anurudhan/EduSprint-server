import { CourseEntity } from "../../../domain/entities/CourseEntity";
import { Course } from "../models";

export const createCourse = async(data:CourseEntity) =>{
    try{
        console.log(data._id, "this is our ID for the user updating");
        if (!data._id) throw new Error("No  provided the course_id");
        const existing = await Course.findById(data._id)
        let updatedCourse;
        if(!existing){ 
            updatedCourse = await Course.create(data);
        }
        else{
            updatedCourse = await Course.findByIdAndUpdate(
                    data._id, 
                    { $set: data }, 
                    { new: true, runValidators: true } 
                );
        }

        if (!updatedCourse) {
            throw new Error("Course not found or update failed.");
        }

        return updatedCourse; 
    }
    catch(error){
        if (error instanceof Error) {
            throw error; 
        }
        throw new Error("An unexpected error occurred in addCourse.");
    }
}