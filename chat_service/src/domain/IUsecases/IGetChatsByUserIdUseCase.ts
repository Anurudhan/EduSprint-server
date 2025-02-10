import { Types } from "mongoose";
import { ChatEntity } from "../entities";


export interface IGetChatsByUserIdUseCase{
    execute(id: string|Types.ObjectId): Promise<ChatEntity[] | null>;
}