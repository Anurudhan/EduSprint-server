import {
  IAddCategoryUseCase,
  IAddCourseUseCase,
  ICreateEnrollmentUseCase,
  IEditCategoryUseCase,
  IEditCourseUseCase,
  IGetAllCategoryUseCase,
  IGetAllCourseUseCase,
  IGetCourseById,
  IGetCourseInstructorUseCase,
  IGetEnrollmentByIdUseCase,
  IGetEnrollmentByUserIdUseCase,
  IStreamVideoUseCase,
  IUpdateEnrollmentUseCase,
} from "../../domain/IUseCases";
import { ICreateAssessmentResultUseCase, ICreateAssessmentUseCase, IGetAssessmentByCourseIdUseCase, IGetAssessmentByLessonIdUseCase, IGetAssessmentResultByEnrollementIdUseCase } from "../../domain/IUseCases/IAssessment";

import { IDependencies } from "./IDepndencies";

export interface IUseCases {
  // category
  createCategoryUseCase: (dependencies: IDependencies) => IAddCategoryUseCase;
  editCategoryUseCase: (dependencies: IDependencies) => IEditCategoryUseCase;
  getAllCategoryUseCase: (dependencies: IDependencies) => IGetAllCategoryUseCase;

  // Course
  createCourseUseCase : (dependencies:IDependencies) => IAddCourseUseCase;
  updateCourseUseCase : (dependencies:IDependencies) => IEditCourseUseCase;
  getCourseByInstructorUseCase:(dependencies:IDependencies) => IGetCourseInstructorUseCase;
  getCourseByIdUseCase:(dependencie:IDependencies)=>IGetCourseById;
  getAllCourseUseCase:(dependencie:IDependencies) =>IGetAllCourseUseCase;
  streamVideoUseCase:(dependencie:IDependencies) => IStreamVideoUseCase;

  createEnrollmentUseCase: (dependencies: IDependencies) => ICreateEnrollmentUseCase; 
  updateEnrollmentUseCase: (dependencies: IDependencies) => IUpdateEnrollmentUseCase; 
	getEnrollmentByUserIdUseCase: (dependencies: IDependencies) => IGetEnrollmentByUserIdUseCase;
  getEnrollmentByIdUseCase: (dependencies: IDependencies) => IGetEnrollmentByIdUseCase;

  createAssessmentUseCase:(depencies:IDependencies) => ICreateAssessmentUseCase;
  createAssessmentResultUseCase:(depencies:IDependencies) => ICreateAssessmentResultUseCase;
  updateAssessmentUseCase:(depencies:IDependencies) => ICreateAssessmentUseCase;
  getAssessmentByLessonIdUseCase:(dependencies:IDependencies) =>IGetAssessmentByLessonIdUseCase ;
  getAssessmentByCourseIdUseCase:(dependencies:IDependencies) =>IGetAssessmentByCourseIdUseCase ;
  getAssessmentResultByEnrollmentIdUseCase:(dependencies:IDependencies) =>IGetAssessmentResultByEnrollementIdUseCase ;
}
