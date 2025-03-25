import { BannerEntity } from "../entities/BannerEntity";

export interface IUpdateBannerUseCase {
    execute(data: BannerEntity): Promise < BannerEntity | null >
}