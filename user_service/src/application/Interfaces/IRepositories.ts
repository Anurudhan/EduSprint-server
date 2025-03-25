
import { BannerEntity } from "../../domain/entities/BannerEntity";
import { UserEntity } from "../../domain/entities/UserEntity"



export interface IRepositories{
    getAllInstructors: (page?: number, limit?: number) => Promise <UserEntity[] | null >;
    getAllStudents: (page?: number, limit?: number) => Promise <UserEntity[] | null >;
    updateUser:(data:UserEntity)=>Promise<UserEntity|null>;
    getBanners:(page: number, limit: number) => Promise <{
        data: BannerEntity[]|null, 
        totalItems: number
      }| null >;
    updateBanner:(data:BannerEntity)=>Promise<BannerEntity|null>;
    createBanner:(data:BannerEntity)=>Promise<BannerEntity|null>;
    deleteBanner:(bannerId:string)=>Promise<boolean>;
    getActiveBanners:()=>Promise<BannerEntity[]|null>
}