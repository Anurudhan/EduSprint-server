import { Router } from "express";
import { IDependencies } from "../../application/Interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { protectRouter } from "../../_lib/utilities/middleware/protectRouter";
import { Role } from "../../domain/entities/UserEntity";

export const userRoutes = (dependencies: IDependencies) => {
    const router = Router();
    const { getAllInstructors, getAllStudents, updateProfile } = controllers(dependencies);

    router.get("/get-all-instructors", protectRouter(Role.admin), getAllInstructors);
    router.get("/get-all-students", protectRouter(Role.admin), getAllStudents);
    router.post("/update-profile", protectRouter(), updateProfile);
    router.post("/unblock-block", protectRouter(Role.admin), updateProfile);
    router.post("/verify-instructor", protectRouter(Role.admin), updateProfile);

    return router;
};