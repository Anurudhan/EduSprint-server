import { ObjectId } from "mongoose";
import { IDependencies } from "../interfaces/IDependencies";

export const getChatUsersByIdsUseCase = (dependencies:IDependencies) => {
    const {repository:{getChatUsersByIds}} = dependencies
    return {
        execute:async(Ids:ObjectId[]) => {
            return await getChatUsersByIds(Ids) 
        }
    }
}