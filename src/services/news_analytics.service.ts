import NewsRepository from "../repositories/news.repository";
import QueueWorker from "../workers/QueueWorker";

export default class NewsAnalyticsService {
    private queueWorker: QueueWorker
    // private newsRepository: NewsRepository

    constructor(queueworker: QueueWorker) {
        this.queueWorker = queueworker
        // this.newsRepository = newsRepository
    }

    consume() {
        const queue = process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string
        this.queueWorker.consumeMessage(queue, (msg: any, data: any) => {
            console.log(`fields are ${JSON.stringify(msg)}`)
            // сохраняем в базу данных
        })
    }
}