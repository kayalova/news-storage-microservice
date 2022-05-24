import amqp from 'amqplib/callback_api'

export class NewsService {
    // this.channel; // I need this in 2 methods

    constructor() {
        this.connectToRabbitmq()
    }

    connectToRabbitmq() {

        amqp.connect(process.env.RABBITMQ_HOST as string, (error0, connection) => {
            if (error0) {
                console.error(`Rabbitmq connection error: ${error0}`)
                process.exit(1)
            }

            connection.createChannel((error1, channel) => {
                if (error1) {
                    console.error(`Rabbitmq create channel error: ${error0}`)
                    process.exit(1)
                }

                const QUEUE = process.env.QUEUE_CORE as string
                const message = 'meow'

                // this.channel = channel
                channel.assertQueue(QUEUE, { durable: false });
            })

        });
    }


    getNews() {
        // this.channel.sendToQueue(QUEUE, Buffer.from(message));
    }
}
