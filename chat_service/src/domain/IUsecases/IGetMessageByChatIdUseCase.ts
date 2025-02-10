import { Types } from "mongoose";
import { MessageEntity } from "../entities";


export interface IGetMessageByChatIdUseCase{
    execute(id: string|Types.ObjectId): Promise<MessageEntity[] | null>;
}