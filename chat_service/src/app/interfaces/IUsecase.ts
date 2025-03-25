import { ICreateChatUseCase, ICreateMessageUseCase, IGetChatsByUserIdUseCase, IGetChatUsersByIdsUseCase, IGetMessageByChatIdUseCase } from "../../domain/IUsecases";
import { IDependencies } from "./IDependencies";

export interface IUsecase{
    createChatUseCase:(dependancies:IDependencies) => ICreateChatUseCase;
    createMessageUseCase:(dependencies:IDependencies) => ICreateMessageUseCase;
    getChatsByUserIdUseCase: (dependencies: IDependencies) => IGetChatsByUserIdUseCase;
    getMessagesByChatIdUseCase:(dependencies: IDependencies) => IGetMessageByChatIdUseCase;
    getChatUsersByIdsUseCase:(dependencies:IDependencies) => IGetChatUsersByIdsUseCase;
}