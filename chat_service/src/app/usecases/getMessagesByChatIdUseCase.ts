import { Types } from "mongoose";
import { IDependencies } from "../interfaces/IDependencies";

export const getChatsByUserIdUseCase = (dependencies:IDependencies) => {
    const {repository : {getChatsByUserId}} = dependencies;

    return {
        execute: async(id:string|Types.ObjectId) => {
            return await getChatsByUserId(id)
        }
    }
}