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
        if (!this.channel) {
            await this.getChannel()
        }

        this.channel!.sendToQueue(queue, msg, this.msgOptions)

    }
}
