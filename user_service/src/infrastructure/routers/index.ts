import { Router } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { protectRouter } from "../../_lib/utilities/middleware/protectRouter";
import { Role } from "../../domain/entities/UserEntity";
import { updateBannerStatusMiddleware } from "../../_lib/utilities/middleware/updateBannerStatusMiddleware ";

export const userRoutes = (dependencies: IDependencies) => {
    const router = Router();
    const { getAllInstructors, getAllStudents, updateProfile,getBanners,createBanner,updateBanner,deleteBanner,getActiveBanners } = controllers(dependencies);

    router.get("/get-all-instructors", protectRouter(Role.admin), getAllInstructors);
    router.get("/get-all-students", protectRouter(Role.admin), getAllStudents);
    router.post("/update-profile", protectRouter(), updateProfile);
    router.post("/unblock-block", protectRouter(Role.admin), updateProfile);
    router.post("/verify-instructor", protectRouter(Role.admin), updateProfile);
    router.route("/banner").get(updateBannerStatusMiddleware,getBanners).post(protectRouter(Role.admin), createBanner).
    put(protectRouter(Role.admin), updateBanner)
    router.route("/banner/:bannerId").delete(protectRouter(Role.admin), deleteBanner);
    router.get("/active-banners",updateBannerStatusMiddleware,getActiveBanners)

    return router;
};