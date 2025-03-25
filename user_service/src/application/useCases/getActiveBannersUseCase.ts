import { IDependencies } from "../Interfaces/IDependencies";


export const getActiveBannersUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { getActiveBanners },
    } = dependencies;
    return {
        execute: async () => {
            return await getActiveBanners();
        },
    };
};