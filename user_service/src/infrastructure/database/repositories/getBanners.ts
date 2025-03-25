import { BannerEntity } from "../../../domain/entities/BannerEntity";
import Banner from "../models/bannerModal";

export const getBanners = async (
  page: number,
  limit: number
): Promise<{
  data: BannerEntity[] | null;
  totalItems: number;
}> => {
  try {
    const skip = (page - 1) * limit;
    const totalItems = await Banner.countDocuments();

    const banners = await Banner.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const value = {
      data: banners,
      totalItems: totalItems > 0 ? totalItems : 0,
    };
    return value;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
