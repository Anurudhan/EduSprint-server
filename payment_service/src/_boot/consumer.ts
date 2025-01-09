import { consumer } from "../infrastructure/kafka"
import {  createSubscriber, IPaymentSubscriber } from "../infrastructure/kafka/subscriber";


export const startConsumer = async () => {
    try {
        await consumer.connect()
        await consumer.subscribe({
            topic: 'payment-service-topic',
            fromBeginning: true
        })

        const subscriber = createSubscriber();

        await consumer.run({

            eachMessage: async ({ message }) => {

                const { key, value } = message;

                const subscriberMethod = String(key) as keyof IPaymentSubscriber;
                const subscriberData = JSON.parse(String(value));

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