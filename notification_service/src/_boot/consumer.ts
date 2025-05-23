import { consumer } from "../Infrastructure/kafka";
import { createSubscriber, INotificationSubscriber } from "../Infrastructure/kafka/subscriber";


export const startConsumer = async () => {
    try {
        await consumer.connect()
        await consumer.subscribe({
            topic: 'notification-service-topic',
            fromBeginning: true
        })

        const subscriber = createSubscriber();

        await consumer.run({
            eachMessage: async ({ message }) => {
                
                const { key, value } = message;
        
                const subscriberMethod = String(key) as keyof INotificationSubscriber;
                const subscriberData = JSON.parse(String(value));
        
                console.log('Key:', subscriberMethod);  // Log the key
                console.log('Subscriber:', subscriber);  // Log the subscriber object
        
                if (typeof subscriber[subscriberMethod] !== 'function') {
                    throw new Error(`Method ${subscriberMethod} is not a function on the subscriber object`);
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