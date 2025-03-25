import { BannerEntity } from "../entities/BannerEntity";


export interface ICreateBannerUseCase {
    execute(data:BannerEntity): Promise <BannerEntity | null>
}