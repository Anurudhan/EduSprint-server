import { IMessage } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const createMessageUseCase = (dependencies:IDependencies) => {
    const {repository : {createMessage}} = dependencies;

    return {
        execute: async(data:IMessage) => {
            return await createMessage(data)
        }
    }
}