import {Producer, Kafka, Consumer, Partitioners} from 'kafkajs'

const kafka = new Kafka ({
    clientId: 'user-service' ,
    // brokers: ["localhost:29092"]
    brokers: ['kafka:9092']
})

export const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
export const consumer:Consumer = kafka.consumer({groupId:"user-service-kafka-group"})