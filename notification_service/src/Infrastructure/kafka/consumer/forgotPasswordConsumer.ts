import { sendForgotPasswordMail } from "../../services/mail";

export default async (data: { email: string; token: string }) => {
	try {
		await sendForgotPasswordMail(data.email, data.token);
	} catch (error: any) {
		console.log("forgot-password-consumer error: ", error?.message);
	}
};