import amqp from 'amqplib'

const connection = amqp.connect({
    hostname: process.env.RABBITMQ_HOST as string,
    port: Number(process.env.RABBITMQ_PORT)
})

export default connection