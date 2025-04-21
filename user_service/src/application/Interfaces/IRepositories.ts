
import { BannerEntity } from "../../domain/entities/BannerEntity";
import { UserEntity } from "../../domain/entities/UserEntity"
import { StudentQueryResult } from "../../infrastructure/database/repositories";



export interface IRepositories{
    getAllInstructors: (page?: number, limit?: number,search?:string) => Promise <StudentQueryResult >;
    getAllStudents: (page?: number, limit?: number,search?:string) => Promise <StudentQueryResult >;
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