import { BannerEntity } from "../../../domain/entities/BannerEntity";
import Banner from "../models/bannerModal";

export const deleteBanner = async ( bannerId:string ) : Promise < boolean > => {
    try {
        const banner = await Banner.findByIdAndDelete(bannerId);
        return banner?true:false; 
    } catch (error: any) {
        throw new Error(error?.message);
    }
}