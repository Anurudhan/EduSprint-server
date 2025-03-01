import { IndividualChatEntity } from "../entities";

export interface ICreateChatUseCase{
    execute(data:IndividualChatEntity):Promise<IndividualChatEntity>;
}