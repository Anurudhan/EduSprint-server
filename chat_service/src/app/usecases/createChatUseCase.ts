import { IChat } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";


export const createChatUseCase = (dependencies: IDependencies) => {
    const {
        repository: { createChat,existingChat }
    } = dependencies;

    return {
        execute: async (data: IChat) => {
            const isExisting = await existingChat(data)
            if(isExisting) return null;
            return await createChat(data);
        }
    }
}