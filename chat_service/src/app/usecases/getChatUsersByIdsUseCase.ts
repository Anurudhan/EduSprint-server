import {  Types } from "mongoose";
import { IDependencies } from "../interfaces/IDependencies";

export const getChatUsersByIdsUseCase = (dependencies:IDependencies) => {
    const {repository:{getChatUsersByIds}} = dependencies
    return {
        execute:async(ids:Types.ObjectId[]) => {
            return await getChatUsersByIds(ids) 
        }
    }
}