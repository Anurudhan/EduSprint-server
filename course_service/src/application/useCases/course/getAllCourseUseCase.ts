import { filterEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDepndencies";

export const getAllCourseUseCase = (dependencie:IDependencies) => {
    const {repositories:{getAllCourse}} =dependencie;
    return {
        execute:async(data:{page?:number;limit?:number,filters?:filterEntity}) =>{
            try {
                const {courses,totalCourses} =  await getAllCourse(data)
                const totalPages =data.limit? Math.ceil(totalCourses/data.limit):1;
                return {courses,totalPages}
                
            } catch (error:unknown) {
                if(error instanceof Error) throw new Error(error.message);
                else throw new Error("An unknown error message"); 
            }

        }
    }
}