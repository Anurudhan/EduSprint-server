import { IDependencies } from "../../app/interfaces/IDependencies";
import { getMessagesByChatId } from "../../infrastructure/database/repository";
import { createChatController } from "./createChatController";
import { createMessageController } from "./createMessageController";
import { getChatsByUserIdController } from "./getChatsByUserIdController";
import { getMessagesByChatIdController } from "./getMessageByChatIdController";

export const controllers = (dependancies:IDependencies) =>{
    return {
        createChat:createChatController(dependancies),
        createMessage:createMessageController(dependancies),
        getChatsByUserId:getChatsByUserIdController(dependancies),
        getMessagesByChatId:getMessagesByChatIdController(dependancies)
    }
}