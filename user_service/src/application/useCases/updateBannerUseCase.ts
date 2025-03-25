import { BannerEntity } from "../../domain/entities/BannerEntity";
import { IDependencies } from "../Interfaces/IDependencies";


export const updateBannerUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { updateBanner },
    } = dependencies;
    return {
        execute: async (data:BannerEntity) => {
            return await updateBanner(data);
        },
    };
};