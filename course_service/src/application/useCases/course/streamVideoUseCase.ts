import { IDependencies } from "../../interfaces/IDepndencies";

export const streamVideoUseCase =(dependencie:IDependencies) =>{
    const {repositories:{streamVideo}} = dependencie;
    return{
        execute:async(courseId:string)=>{
            try {
                return await streamVideo(courseId)
            } catch (error:unknown) {
                if(error instanceof Error) throw new Error(error.message);
                else throw new Error("An unknownn error");
            }
        }
    }
}