import { Kafka, Producer, Consumer, Partitioners } from "kafkajs";

export const kafka = new Kafka({
	clientId: "notification-service",
    // brokers: ["localhost:29092"]
    brokers: ['kafka:9092']
});

export const producer: Producer = kafka.producer({
	createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer: Consumer = kafka.consumer({
	groupId: "notification-service-kafka-group",
});
