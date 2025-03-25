import { IDependencies } from "../../application/Interfaces/IDependencies";
import { createBannerController } from "./createBannerController";
import { deleteBannerController } from "./deleteBannerController";
import { getActiveBannersController } from "./getActiveBannersController";
import { getAllInstructorsController } from "./getAllInstructorsController";
import { getAllStudentsController } from "./getAllStudentsControllers";
import { getBannersController } from "./getBannersController";
import { updateBannerController } from "./updateBannerController";
import { updateUserProfile } from "./updateUserProfile";


export const controllers = (dependencies:IDependencies) => {
    return{
        getAllInstructors: getAllInstructorsController(dependencies),
        getAllStudents:getAllStudentsController(dependencies),
        updateProfile:updateUserProfile(dependencies),
        getBanners:getBannersController(dependencies),
        createBanner:createBannerController(dependencies),
        updateBanner:updateBannerController(dependencies),
        deleteBanner:deleteBannerController(dependencies),
        getActiveBanners:getActiveBannersController(dependencies)

    }
}