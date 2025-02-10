import { ChatEntity } from "../../domain/entities";
import { ICreateChatUseCase, ICreateMessageUseCase, IGetChatsByUserIdUseCase, IGetMessageByChatIdUseCase } from "../../domain/IUsecases";
import { IDependencies } from "./IDependencies";

export interface IUsecase{
    createChatUseCase:(dependancies:IDependencies) => ICreateChatUseCase;
    createMessageUseCase:(dependencies:IDependencies) => ICreateMessageUseCase;
    getChatsByUserIdUseCase: (dependencies: IDependencies) => IGetChatsByUserIdUseCase;
    getMessagesByChatIdUseCase:(dependencies: IDependencies) => IGetMessageByChatIdUseCase;
}