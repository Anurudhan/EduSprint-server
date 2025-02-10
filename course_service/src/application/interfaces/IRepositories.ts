import { AssessmentEntity, CategoryEntity, CourseEntity, EnrollmentEntity, filterEntity, pageEntity, PaginationMeta } from "../../domain/entities"

export interface IRepositories{
    createCategory: (data: CategoryEntity) => Promise < CategoryEntity>;
    editCategory:(data: CategoryEntity) => Promise < CategoryEntity>;
    getAllCategory:(data:pageEntity)=>Promise<{ categories: CategoryEntity[]; meta: PaginationMeta }>;

    addCourse:(data:CourseEntity) => Promise <CourseEntity>;
    editCourse:(data:CourseEntity) => Promise <CourseEntity>;
    getCourseByInstructor:(id:string) => Promise <CourseEntity[]>;
    getCourseById:(id:string) => Promise <CourseEntity|null>;
    getAllCourse:(data:{page?:number;limit?:number;filters?:filterEntity}) => Promise <{courses:CourseEntity[],totalCourses:number}>;

    createEnrollment: (data: EnrollmentEntity) => Promise <EnrollmentEntity | null>;
    getEnrollmentByUserId: (userId: string) => Promise<EnrollmentEntity[] | null>;
    getEnrollmentById:(id:string) => Promise<EnrollmentEntity|null>;

    createAssessment:(data:AssessmentEntity) => Promise <AssessmentEntity|null>;
} 