import { BannerEntity } from "../../../domain/entities/BannerEntity";
import Banner from "../models/bannerModal";
import { ObjectId } from "mongodb";

export const updateBanner = async ( data: BannerEntity ) : Promise < BannerEntity | null > => {
    try {
        console.log(data._id,"this is data Id")
        const banner = await Banner.findByIdAndUpdate(
            new ObjectId(data._id),
            { ...data, updatedAt: Date.now() },
            { new: true, runValidators: true }
          );
          console.log(banner,"this is the update")
        return banner?banner:null; 
    } catch (error: any) {
        throw new Error(error?.message);
    }
}