import QueueWorker from "../workers/QueueWorker";
import NewsAnalyticsRepository from "../repositories/newsAnalytics.repository";

class NewsAnalyticsService {
    private queueWorker: QueueWorker
    private newsAnalyticsRepository: NewsAnalyticsRepository

    constructor(queueworker: QueueWorker, newsAnalyticsRepository: NewsAnalyticsRepository) {
        this.queueWorker = queueworker
        this.newsAnalyticsRepository = newsAnalyticsRepository
    }

    consume() {
        const queue = process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string
        this.queueWorker.consumeMessage(queue, (msg: any, data: any) => {
            this.newsAnalyticsRepository.insert(msg.data).then(() => { })
        })
    }
}

export default NewsAnalyticsService