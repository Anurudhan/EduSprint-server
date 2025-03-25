import { Types } from "mongoose";
import { IMessage } from "../entities";


export interface IGetMessageByChatIdUseCase{
    execute(id: string|Types.ObjectId): Promise<IMessage[] | null>;
}