import { UserEntity } from "../../domain/entities";
import { updateUserConsumer } from "./consumer/userUpdatedConsumer";
import { coursePurchaseSuccessConsumer } from "./consumer";


export interface ISubscriber {
	updateUser: (data: UserEntity) => Promise<void>;
	coursePurchaseSuccess(data: any): Promise <void>;

}

export interface IUserSubscriber
	extends Pick<
		ISubscriber,
		"updateUser"| "coursePurchaseSuccess" 
	> {}

export const createSubscriber = (): IUserSubscriber => {
	return {
		updateUser: updateUserConsumer,
		coursePurchaseSuccess: coursePurchaseSuccessConsumer,	
	};
};