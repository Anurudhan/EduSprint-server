import { Router } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { protectRouter } from "../../_lib/utilities/middleware/protectRouter";
import { Role } from "../../domain/entities/UserEntity";
import { updateBannerStatusMiddleware } from "../../_lib/utilities/middleware/updateBannerStatusMiddleware ";

export const userRoutes = (dependencies: IDependencies) => {
    const router = Router();
    const { getAllInstructors, getAllStudents, updateProfile,getBanners,createBanner,updateBanner,deleteBanner,getActiveBanners } = controllers(dependencies);

    router.get("/user/get-all-instructors", protectRouter(Role.admin), getAllInstructors);
    router.get("/user/get-all-students", protectRouter(Role.admin), getAllStudents);
    router.post("/user/update-profile", protectRouter(), updateProfile);
    router.post("/user/unblock-block", protectRouter(Role.admin), updateProfile);
    router.post("/user/verify-instructor", protectRouter(Role.admin), updateProfile);
    router.route("/user/banner").get(updateBannerStatusMiddleware,getBanners).post(protectRouter(Role.admin), createBanner).
    put(protectRouter(Role.admin), updateBanner)
    router.route("/user/banner/:bannerId").delete(protectRouter(Role.admin), deleteBanner);
    router.get("/user/active-banners",updateBannerStatusMiddleware,getActiveBanners)

    return router;
};