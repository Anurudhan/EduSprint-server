import { CourseEntity } from "../../domain/entities/CourseEntity";
import { UserEntity } from "../../domain/entities/UserEntity";
import { courseCreatedConsumer, userCreatedConsumer } from "./consumers";



export interface ISubscriber {
	courseCreated: (data: CourseEntity) => Promise<void>;
	userCreated:(data: UserEntity) => Promise <void>;

}

export interface IPaymentSubscriber
	extends Pick<
		ISubscriber,
		"userCreated"| "courseCreated" 
	> {}

export const createSubscriber = (): IPaymentSubscriber => {
	return {
		courseCreated: courseCreatedConsumer,
		userCreated: userCreatedConsumer,	
	};
};