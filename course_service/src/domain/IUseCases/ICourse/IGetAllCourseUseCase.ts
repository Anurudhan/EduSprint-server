import { CourseEntity, filterEntity } from "../../entities";

export interface IGetAllCourseUseCase{
    execute(data:{page?:number;limit?:number;filters:filterEntity}):Promise <{courses:CourseEntity[],totalPages:number}>;
}