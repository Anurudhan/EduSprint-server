import { BannerEntity } from "../../domain/entities/BannerEntity";
import { IDependencies } from "../Interfaces/IDependencies";


export const createBannerUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { createBanner },
    } = dependencies;
    return {
        execute: async (data:BannerEntity) => {
            return await createBanner(data);
        },
    };
};