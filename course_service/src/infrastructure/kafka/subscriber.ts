import {
	userCreatedConsumer,
	coursePurchaseSuccessConsumer,
} from "./consumer";

export interface ISubscriber {
	coursePurchaseSuccess: (data: any) => Promise <void>;
	userCreated: (data: any) => Promise<void>;
}

export interface ICourseSubscriber
	extends Pick<
		ISubscriber,
		| "userCreated"
		| "coursePurchaseSuccess"
	> {}

export const createSubscriber = (): ICourseSubscriber => {
	return {
		userCreated: userCreatedConsumer,
		coursePurchaseSuccess: coursePurchaseSuccessConsumer,
	};
};