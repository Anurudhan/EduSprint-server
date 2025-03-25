import { CourseEntity } from "../../entities";

export interface IStreamVideoUseCase{
    execute(courseId:string) : Promise<CourseEntity|null>;
}