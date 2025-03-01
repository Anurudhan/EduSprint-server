import {  IndividualChatEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";


export const createChatUseCase = (dependencies: IDependencies) => {
    const {
        repository: { createChat,existingChat }
    } = dependencies;

    return {
        execute: async (data: IndividualChatEntity) => {
            const isExisting = await existingChat(data)
            if(isExisting) return isExisting;
            return await createChat(data);
        }
    }
}