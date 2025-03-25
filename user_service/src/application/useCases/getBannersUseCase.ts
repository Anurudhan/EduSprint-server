import { IDependencies } from "../Interfaces/IDependencies";


export const getBannersUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { getBanners },
    } = dependencies;
    return {
        execute: async (page: number, limit: number) => {
            return await getBanners(page, limit);
        },
    };
};