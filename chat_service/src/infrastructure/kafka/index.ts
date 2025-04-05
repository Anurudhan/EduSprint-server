import { Producer, Kafka, Consumer, Partitioners } from "kafkajs";

const kafka = new Kafka({
	clientId: "chat-service",
    // brokers: ["localhost:29092"]
    brokers: ['kafka:9092']
});

export const producer: Producer = kafka.producer({
	createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer: Consumer = kafka.consumer({
	groupId: "chat-service-kafka-group",
});