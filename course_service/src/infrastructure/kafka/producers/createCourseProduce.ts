
import { producer } from "..";
import { CourseEntity } from "../../../domain/entities";

export default async (data: CourseEntity) => {
	try {
		await producer.connect();
		const message: any = [
			{
				topic: "payment-service-topic",
				messages: [
					{
						key: "courseCreated",
						value: JSON.stringify(data),
					},
				],
			}
		]

		
		await producer.sendBatch({topicMessages: message});

		console.log(message, "course created produced--->");

	} catch (error: any) {
		console.error("kafka produce error:", error?.message);
	} finally {
		await producer.disconnect();
	}
};