
import { IDependencies } from "../Interfaces/IDependencies";


export const deleteBannerUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { deleteBanner },
    } = dependencies;
    return {
        execute: async (bannerId:string) => {
            return await deleteBanner(bannerId);
        },
    };
};