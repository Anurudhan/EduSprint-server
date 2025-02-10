import { Types } from "mongoose";
import { ChatEntity, MessageEntity } from "../../domain/entities";

export interface IRepository{
    createChat:(data:ChatEntity) => Promise<ChatEntity|null>;
    createMessage:(data:MessageEntity) => Promise<MessageEntity|null>;
    getChatsByUserId: (id: string|Types.ObjectId) => Promise<ChatEntity[] | null>;
    getMessagesByChatId:(id: string|Types.ObjectId) => Promise<MessageEntity[] | null>;

}