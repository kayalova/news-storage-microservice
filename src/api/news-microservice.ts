import amqp from 'amqplib'
import QueueWorker from '../workers/QueueWorker';

export default class NewsService {
    private queueWorker: QueueWorker

    constructor(queueWorker: QueueWorker) {
        this.queueWorker = queueWorker
    }


    async init() {
        // this.queueWorker.consumeMessage(process.env.NEWS_REQUEST_QUEUE as string, this.handleRequest)
        this.queueWorker.consumeMessage(process.env.NEWS_REQUEST_QUEUE as string, async (data: any) => {
            const msg = JSON.parse(data?.content.toString())
            await this.queueWorker.sendMessage(process.env.NEWS_RESPONSE_QUEUE as string, JSON.stringify({ response: 'meow', request: msg.request }))
        })
    }

    async handleRequest(request: any) {
        console.log('--')
        console.log(this.queueWorker)
        await this.queueWorker.sendMessage(process.env.NEWS_RESPONSE_QUEUE as string, Buffer.from(JSON.stringify({ response: 'meow', request })))
    }
}
