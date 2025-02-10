import { ChatEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";


export const createChatUseCase = (dependencies: IDependencies) => {
    const {
        repository: { createChat }
    } = dependencies;

    return {
        execute: async (data: ChatEntity) => {
            return await createChat(data);
        }
    }
}