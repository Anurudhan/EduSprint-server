import { userCreatedConsumer } from "./consumer";



export interface ISubscriber {
	userCreated: (data: any) => Promise <void>
}

export interface IChatSubscriber
	extends Pick<
		ISubscriber,
		| "userCreated"

	> {}

export const createSubscriber = (): IChatSubscriber => {
	return {
		userCreated: userCreatedConsumer
	};
};