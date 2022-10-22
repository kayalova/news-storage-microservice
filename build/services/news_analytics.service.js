"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NewsAnalyticsService {
    constructor(queueworker, newsAnalyticsRepository) {
        this.queueWorker = queueworker;
        this.newsAnalyticsRepository = newsAnalyticsRepository;
    }
    consume() {
        const queue = process.env.NEWS_ANALYTICS_REQUEST_QUEUE;
        this.queueWorker.consumeMessage(queue, (msg, data) => {
            this.newsAnalyticsRepository.insert(msg).then(() => { });
        });
    }
}
exports.default = NewsAnalyticsService;
//# sourceMappingURL=news_analytics.service.js.map