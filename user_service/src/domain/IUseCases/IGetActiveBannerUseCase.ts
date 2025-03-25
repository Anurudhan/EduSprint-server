import { BannerEntity } from "../entities/BannerEntity";


export interface IGetActiveBannerUseCase {
    execute(): Promise <BannerEntity[]|null>
}