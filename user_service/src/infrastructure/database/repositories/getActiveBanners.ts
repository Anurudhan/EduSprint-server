import { BannerEntity, BannerStatus } from "../../../domain/entities/BannerEntity";
import Banner from "../models/bannerModal";

export const getActiveBanners = async (): Promise<BannerEntity[] | null> => {
  try {

    const banners = await Banner.find({ status: BannerStatus.Active })
      .sort({ createdAt: -1 }); 

    return banners.length > 0 ? banners : null;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
