import { Router } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";

export const routers = (dependancies:IDependencies ) => {
    const {
        createChat,
        createMessage,
        getChatsByUserId,
        getMessagesByChatId
    } = controllers(dependancies);

    const router = Router()
    router.route("/").post(createChat);
    router.route("/message").post(createMessage);
    router.route("/message/:chatId").get(getMessagesByChatId);
    router.route("/user/:userId").post(getChatsByUserId)
    return router;
}