import QueueWorker from "../workers/QueueWorker";
import NewsAnalyticsRepository from "../repositories/newsAnalytics.repository";

export default class NewsAnalyticsService {
    private queueWorker: QueueWorker
    private newsAnalyticsRepository: NewsAnalyticsRepository
    // private newsRepository: NewsRepository

    constructor(queueworker: QueueWorker, newsAnalyticsRepository: NewsAnalyticsRepository) {
        this.queueWorker = queueworker
        this.newsAnalyticsRepository = newsAnalyticsRepository

    }

    consume() {
        const queue = process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string
        this.queueWorker.consumeMessage(queue, (msg: any, data: any) => {
            // сохраняем в базу данных
            this.newsAnalyticsRepository.insert(msg).then(() => { })

        })
    }
}