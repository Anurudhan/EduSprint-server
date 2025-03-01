import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDepndencies";
import { controller } from "../../presentation/controllers";
import { protectRouter } from "../../_lib/middleware/protectRoute";
import { Role } from "../../domain/entities";

export const routes = (dependencie:IDependencies)=>{
    const router=Router();
    const {createCategory,editCategory,
        getAllCategory,addCourse,getCourseByInstructor
        ,getCourseById,updateCourse,getAllCourse,
        createEnrollment,getEnrollmentByUserId,
    createAssessment,getAssessment,updateEnrollment,
updateAssessment} = controller(dependencie)

    router.route("/create-category").post(protectRouter(Role.admin),createCategory);
    router.route("/update-category").post(protectRouter(Role.admin),editCategory);
    router.route("/getallcategory").get(getAllCategory);

    router.route("/").post(protectRouter(Role.teacher),addCourse);
    router.route("/getcourse/:id").get(getCourseById)
    router.route("/instructor-courses").get(protectRouter(Role.teacher),getCourseByInstructor);
    router.route("/updatecourse").post(protectRouter(Role.teacher),updateCourse);
    router.route("/allcourse").get(getAllCourse);

    router.route("/enrollment").post(protectRouter(),createEnrollment).put(protectRouter(),updateEnrollment)
    router.route("/enrollment/:id").get();
    router.route("/enrollment/user/:userId").get(protectRouter(),getEnrollmentByUserId);

    router.route("/assessment").get(protectRouter(),getAssessment).post(protectRouter(Role.teacher),createAssessment).put(protectRouter(Role.teacher),updateAssessment)

    return router
}