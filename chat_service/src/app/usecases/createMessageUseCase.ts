import { MessageEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const createMessageUseCase = (dependencies:IDependencies) => {
    const {repository : {createMessage}} = dependencies;

    return {
        execute: async(data:MessageEntity) => {
            return await createMessage(data)
        }
    }
}