import { IChat } from "../entities";

export interface ICreateChatUseCase{
    execute(data:IChat):Promise<IChat|null>;
}