import { Course } from "../../models/courseModel";

export const getCourseByInstructor = async(data:{id:string,page:string,limit:string})=>{
    try {
        const pageNumber = parseInt(data.page);
        const limitNumber = parseInt(data.limit);
        const value =  await Course.find({instructorRef:data.id}).skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);;
        const total = await Course.countDocuments();
        return {courses:value,totalPages: Math.ceil(total / limitNumber).toString()};
    } catch (error:unknown) {
        if(error instanceof Error){
            throw new Error(error.message);
        }
        else throw new Error("An unknown error")
    }
}