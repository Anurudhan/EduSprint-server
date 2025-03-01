import { consumer } from "../infrastructure/kafka"
import { ICourseSubscriber, createSubscriber } from "../infrastructure/kafka/subscriber";


export const startConsumer = async () => {
    try {
        await consumer.connect()
        await consumer.subscribe({
            topic: 'course-service-topic',
            fromBeginning: true
        })

        const subscriber = createSubscriber();

        await consumer.run({

            eachMessage: async ({ message }) => {

                const { key, value } = message;

                console.log('Received key:', String(key),JSON.parse(String(value))); 

                const subscriberMethod = String(key) as keyof ICourseSubscriber;
                const subscriberData = JSON.parse(String(value));
                if (!subscriber[subscriberMethod] || typeof subscriber[subscriberMethod] !== 'function') {
                    console.error(`Invalid subscriber method: ${subscriberMethod}`);
                    return; // Skip processing instead of throwing error
                }

                try {
                    await subscriber[subscriberMethod](subscriberData);
                } catch (error: any) {
                    throw new Error(error?.message);
                }
            }

        });
    } catch (error: any) {
        throw new Error("Kafka Consume Error : " + error?.message);
    }
}

export const stopConsumer = async () => {
    await consumer.stop();
    await consumer.disconnect();
}