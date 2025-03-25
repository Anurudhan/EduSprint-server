import { ObjectId, Types } from "mongoose";
import { IChat,IMessage, UserEntity } from "../../domain/entities";

export interface IRepository{
    createChat:(data:IChat) => Promise<IChat|null>;
    createMessage:(data:IMessage) => Promise<IMessage|null>;
    getChatsByUserId: (id: string|Types.ObjectId) => Promise<IChat[] | null>;
    getMessagesByChatId:(id: string|Types.ObjectId) => Promise<IMessage[] | null>;
    existingChat:(data:IChat) => Promise<IChat|null>;
    getChatById:(Id:string) => Promise<IChat|null>;
    createUser:(data:UserEntity) =>Promise<UserEntity|null>;
    getChatUsersByIds:(Ids:ObjectId[]) =>Promise<UserEntity[]|null>;
}