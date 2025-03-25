import { ObjectId } from "mongoose";
import { UserEntity } from "../entities";

export interface IGetChatUsersByIdsUseCase{
    execute(Ids: ObjectId[]): Promise<UserEntity[] | null>;
}