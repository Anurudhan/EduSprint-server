import { Interface } from "readline";
import { AssessmentEntity, AssessmentResult, CategoryEntity, CourseEntity, EnrollmentEntity, filterEntity, pageEntity, PaginationMeta } from "../../domain/entities"

export interface IRepositories{
    createCategory: (data: CategoryEntity) => Promise < CategoryEntity>;
    editCategory:(data: CategoryEntity) => Promise < CategoryEntity>;
    getAllCategory:(data:pageEntity)=>Promise<{ categories: CategoryEntity[]; meta: PaginationMeta }>;

    addCourse:(data:CourseEntity) => Promise <CourseEntity>;
    editCourse:(data:CourseEntity) => Promise <CourseEntity>;
    getCourseByInstructor:(data:{id:string,page:string,limit:string,search:string}) => Promise <{courses:CourseEntity[],totalPages:string}>;
    getCourseById:(id:string) => Promise <CourseEntity|null>;
    getAllCourse:(data:{page?:number;limit?:number;filters?:filterEntity}) => Promise <{courses:CourseEntity[],totalCourses:number}>;
    streamVideo:(courseId:string) => Promise<CourseEntity|null>;

    createEnrollment: (data: EnrollmentEntity) => Promise <EnrollmentEntity | null>;
    updateEnrollment: (data: EnrollmentEntity) => Promise <EnrollmentEntity | null>;
    getEnrollmentByUserId: (userId: string,
        page: number,
        limit: number,
        search: string) => Promise<{ enrollment: EnrollmentEntity[], totalEnrollments: number ,completedCount:number,progressCount:number} | null>;
    getEnrollmentById:(enrollmentId:string) => Promise<EnrollmentEntity|null>;

    createAssessment:(data:AssessmentEntity) => Promise <AssessmentEntity|null>;
    createAssessmentResult:(data:AssessmentResult) => Promise <AssessmentResult|null>;
    getAssessmentByLessonId:({ courseId, lessonId }: { courseId: string; lessonId: string }) => Promise <AssessmentEntity|null>;
    getAssessmentByCourseId:({courseId}:{courseId:string}) => Promise <AssessmentEntity[]|null>;
    getAssessmentResultByEnrollmentId:({enrollmentId}:{enrollmentId:string}) => Promise <AssessmentResult[]|[]>;
    updateAssessment:(data:AssessmentEntity) => Promise <AssessmentEntity|null>;
} 