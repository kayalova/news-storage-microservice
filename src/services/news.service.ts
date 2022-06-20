import amqp from 'amqplib'
import QueueWorker from '../workers/QueueWorker';

export default class NewsService {
    private queueWorker: QueueWorker

    constructor(queueWorker: QueueWorker) {
        this.queueWorker = queueWorker
    }


    async get() {

    }

    async updateOne() {

    }




    async report(msg: any) {
        await this.queueWorker.sendMessage(process.env.NEWS_REPORT_REQUEST_QUEUE as string, JSON.stringify({ data: msg }))

        // this.queueWorker.consumeMessage(process.env.NEWS_REQUEST_QUEUE as string, this.handleRequest)
        // this.queueWorker.consumeMessage(process.env.NEWS_UPDATE_QUEUE as string, async (data: any) => {
        // const msg = JSON.parse(data?.content.toString())
        // })
    }

}
