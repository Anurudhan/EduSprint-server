import { Router } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { protectRouter } from "../../_lib/middleware/protectRouter";

export const routers = (dependancies:IDependencies ) => {
    const {
        createChat,
        createMessage,
        getChatsByUserId,
        getChatUsersByIds,
        getMessagesByChatId
    } = controllers(dependancies);

    const router = Router()
    router.route("/chat").post(protectRouter(),createChat);
    router.route("/chat/message").post(protectRouter(),createMessage);
    router.route("/chat/messages").get(protectRouter(),getMessagesByChatId);
    router.route("/chat/user").get(protectRouter(),getChatsByUserId)
    router.route("/chat/users").get(protectRouter(),getChatUsersByIds)
    return router;
}