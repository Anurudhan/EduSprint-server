import { IMessage } from "../entities";

export interface ICreateMessageUseCase{
    execute(data:IMessage):Promise<IMessage|null>;
}