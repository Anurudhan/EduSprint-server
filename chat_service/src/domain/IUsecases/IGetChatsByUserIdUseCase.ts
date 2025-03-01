import { Types } from "mongoose";
import { ChatEntity, IndividualChatEntity } from "../entities";


export interface IGetChatsByUserIdUseCase{
    execute(id: string|Types.ObjectId): Promise<IndividualChatEntity[] | null>;
}