import { Types } from "mongoose";
import { ChatEntity, IndividualChatEntity, MessageEntity } from "../../domain/entities";

export interface IRepository{
    createChat:(data:IndividualChatEntity) => Promise<IndividualChatEntity>;
    createMessage:(data:MessageEntity) => Promise<MessageEntity|null>;
    getChatsByUserId: (id: string|Types.ObjectId) => Promise<IndividualChatEntity[] | null>;
    getMessagesByChatId:(id: string|Types.ObjectId) => Promise<MessageEntity[] | null>;
    existingChat:(data:IndividualChatEntity) => Promise<IndividualChatEntity|null>;
    getChatById:(Id:string) => Promise<IndividualChatEntity|null>;

}