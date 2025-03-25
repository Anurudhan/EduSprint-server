import { BannerEntity } from "../../../domain/entities/BannerEntity";
import Banner from "../models/bannerModal";

export const createBanner = async ( data: BannerEntity ) : Promise < BannerEntity | null > => {
    try {
        console.log(data,"thisi is the data in repo")
        const newBanner = new Banner(data);
        const banner =await newBanner.save();
        return banner?banner:null; 
    } catch (error: any) {
        throw new Error(error?.message);
    }
}