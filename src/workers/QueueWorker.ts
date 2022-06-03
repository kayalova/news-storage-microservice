import amqp from 'amqplib'

export default class QueueWorker {
    connection: amqp.Connection | undefined
    channel: amqp.Channel | undefined
    msgOptions: amqp.Options.Publish | {}

    constructor(channelOptions?: amqp.Options.Publish) {
        this.connection
        this.channel
        this.msgOptions = channelOptions || {}
    }

    async init() {
        try {
            this.connection = await amqp.connect(process.env.RABBITMQ_HOST as string)
            this.channel = await this.connection.createChannel()
            console.log('Successfully connected to rabbitmq')

        } catch (error) {
            console.error(`Rabbitmq error: ${error}`)
            process.exit(1)
        }
    }

    async getChannel() {
        if (!this.connection || !this.channel) {
            await this.init()
        }

        return this.channel
    }

    async sendMessage(queue: string, msg: any) {
        console.log(`Going to send a message to queue ${queue}`)
        if (!this.channel) {
            await this.getChannel()
        }

        await this.channel!.assertQueue(queue)
        await this.channel!.sendToQueue(queue, Buffer.from(msg), this.msgOptions) // нужно ли прописывать здесь await, помню что после return не нужно
        console.log(`Message was sended to queue ${queue}`)
    }

    async consumeMessage(queue: string, handler: Function) {
        if (!this.channel) {
            await this.getChannel()
        }

        await this.channel!.assertQueue(queue)
        console.log(`Listening to ${queue}`)
        this.channel!.consume(queue, async (data: any) => {
            const msg = JSON.parse(data?.content.toString())
            console.log(`${queue} receive message: ${JSON.stringify(msg)}`)

            await handler(data)
            this.channel!.ack(data)
        })
    }
}
