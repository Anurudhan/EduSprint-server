import { CourseEntity } from "../../../domain/entities/CourseEntity";
import { createCourse } from "../../../infrastructure/database/repositories";


export const courseCreatedConsumer = async (
    data: CourseEntity
) => {

    try {

        await createCourse(data);

        console.log("==========");
        console.log("user-created-consumed");
        console.log("==========");

    } catch (error: any) {
        console.log("user-created-consumed error: ", error?.message);
    }

}