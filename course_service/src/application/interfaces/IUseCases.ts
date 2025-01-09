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
} from "../../domain/IUseCases";

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

  createEnrollmentUseCase: (dependencies: IDependencies) => ICreateEnrollmentUseCase; 
	getEnrollmentByUserIdUseCase: (dependencies: IDependencies) => IGetEnrollmentByUserIdUseCase;
  getEnrollmentByIdUseCase: (dependencies: IDependencies) => IGetEnrollmentByIdUseCase;
}
