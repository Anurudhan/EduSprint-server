import { IDependencies } from "../../interfaces/IDepndencies";

export const getCourseByInstructorUseCase = (dependencie:IDependencies) =>{
    const {repositories:{getCourseByInstructor}}=dependencie;
    return {
        execute:async(data:{id:string,page:string,limit:string})=>{
            try{
                return await getCourseByInstructor(data)
            }
            catch(error:unknown){
                if(error instanceof Error){
                    throw new Error(error.message)
                }
                else throw new Error("An unknown error facing when geting course using instructor Id")
            }
        }
    }
}