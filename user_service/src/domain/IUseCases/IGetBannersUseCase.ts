import { BannerEntity } from "../entities/BannerEntity";


export interface IGetBannersUseCase {
    execute(page: number, limit: number): Promise <{
        data: BannerEntity[]|null, 
        totalItems: number
      }| null>
}