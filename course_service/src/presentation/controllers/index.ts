import { IDependencies } from "../../application/interfaces/IDepndencies";
import { updateAssessment } from "../../infrastructure/database/repositories";
import { createAssessmentController, createAssessmentResultController, getAssessmentController, getAssessmentResultController, updateAssessmentController } from "./assessment";
import { createCategoryController, editCategoryController, getAllCategoryController } from "./category";
import { addCourseController, getAllCourseController, getCourseByIdController, getCourseByInstructorController, streamVideoController, updateCourseController } from "./course";
import { createEnrollmentController, getEnrollmentByIdController, getEnrollmentByUserIdController, updateEnrollmentController } from "./enrollment";

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
        streamVideo:streamVideoController(dependencie),

        createEnrollment:createEnrollmentController(dependencie),
        getEnrollmentByUserId:getEnrollmentByUserIdController(dependencie),
        getEnrollmentById:getEnrollmentByIdController(dependencie),
        updateEnrollment:updateEnrollmentController(dependencie),

        createAssessment:createAssessmentController(dependencie),
        getAssessment:getAssessmentController(dependencie),
        updateAssessment:updateAssessmentController(dependencie),
        getAssessmentResult:getAssessmentResultController(dependencie),
        createAssessmentResult:createAssessmentResultController(dependencie)
    }
}