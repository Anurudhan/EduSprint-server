import { IDependencies } from "../../application/interfaces/IDepndencies";
import { createAssessmentController } from "./assessment";
import { createCategoryController, editCategoryController, getAllCategoryController } from "./category";
import { addCourseController, getAllCourseController, getCourseByIdController, getCourseByInstructorController, updateCourseController } from "./course";
import { createEnrollmentController, getEnrollmentByUserIdController } from "./enrollment";

export const controller = (dependencie:IDependencies) => {
    return {
        createCategory: createCategoryController(dependencie),
        editCategory: editCategoryController(dependencie),
        getAllCategory: getAllCategoryController(dependencie),

        addCourse:addCourseController(dependencie),
        updateCourse:updateCourseController(dependencie),
        getCourseByInstructor:getCourseByInstructorController(dependencie),
        getCourseById:getCourseByIdController(dependencie),
        getAllCourse:getAllCourseController(dependencie),

        createEnrollment:createEnrollmentController(dependencie),
        getEnrollmentByUserId:getEnrollmentByUserIdController(dependencie),

        createAssessment:createAssessmentController(dependencie)
    }
}