import amqp from 'amqplib'

import rabbitmqConnection from '../transport/rabbitmq.transport'

export default class QueueWorker {
    public connection: amqp.Connection
    public channel: amqp.Channel
    msgOptions: amqp.Options.Publish | {}

    constructor(channelOptions?: amqp.Options.Publish) {
        this.msgOptions = channelOptions || {}
    }

    async init() {
        try {

            this.connection = await rabbitmqConnection
            this.channel = await this.connection.createChannel()
            console.log('Successfully connected to rabbitmq')

            this.channel.nackAll() //TODO: уточнить

        } catch (error) {
            console.error(`Rabbitmq error: ${error}`)
            process.exit(1) // todo: move
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

        // await this.channel!.assertQueue(queue) //TODO: оставить
        this.channel!.sendToQueue(queue, Buffer.from(msg), this.msgOptions)
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

            await handler(msg, data)
        }, {
            noAck: true
        })
    }

}
