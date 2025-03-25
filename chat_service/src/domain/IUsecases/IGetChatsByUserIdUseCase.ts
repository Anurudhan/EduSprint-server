import { Types } from "mongoose";
import {IChat } from "../entities";


export interface IGetChatsByUserIdUseCase{
    execute(id: string|Types.ObjectId): Promise<IChat[] | null>;
}