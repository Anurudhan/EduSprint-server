import { Types } from "mongoose";
import { IDependencies } from "../interfaces/IDependencies";

export const getMessagesByChatIdUseCase = (dependencies:IDependencies) => {
    const {repository : {getMessagesByChatId}} = dependencies;

    return {
        execute: async(id:string|Types.ObjectId) => {
            return await getMessagesByChatId(id)
        }
    }
}