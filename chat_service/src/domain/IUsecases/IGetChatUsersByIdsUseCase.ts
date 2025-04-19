import { UserEntity } from "../entities";
import { Types } from "mongoose";

export interface IGetChatUsersByIdsUseCase{
    execute(Ids: Types.ObjectId[]): Promise<UserEntity[] | null>;
}