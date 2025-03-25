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
    router.route("/").post(protectRouter(),createChat);
    router.route("/message").post(protectRouter(),createMessage);
    router.route("/messages").get(protectRouter(),getMessagesByChatId);
    router.route("/user").get(protectRouter(),getChatsByUserId)
    router.route("/users").get(protectRouter(),getChatUsersByIds)
    return router;
}