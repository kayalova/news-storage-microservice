import NewsRepository from "../repositories/news.repository";
import QueueWorker from "../workers/QueueWorker";

export default class NewsAnalyticsService {
    private queueWorker: QueueWorker
    private newsRepository: NewsRepository

    constructor(queueworker: QueueWorker, newsRepository: NewsRepository) {
        this.queueWorker = queueworker
        this.newsRepository = newsRepository
    }

    consume() {
        this.queueWorker.consumeMessage(process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string, () => {
            // сохраняем в базу данных
        })
    }
}