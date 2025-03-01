import { CourseEntity } from "../../entities";

export interface IGetCourseInstructorUseCase{
    execute(data:{id:string,page:string,limit:string}) : Promise<{courses:CourseEntity[],totalPages:string}>;
}