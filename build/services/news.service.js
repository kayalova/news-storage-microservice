"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const news_serializator_1 = require("../repositories/news.serializator");
class NewsService {
    constructor(queueWorker, repository) {
        this.newsRepository = repository;
        this.queueWorker = queueWorker;
    }
    getAll(options, pagination) {
        return this.newsRepository.get(options, pagination);
    }
    getOne(id) {
        return this.newsRepository.getOne(id);
    }
    async create(options) {
        const news = await this.newsRepository.create(options);
        this.report((0, news_serializator_1.deserializeToClickhouse)(news));
        return news;
    }
    async update(id, body) {
        await this.newsRepository.update(id, body);
        const newsWithAuthor = await this.getOne(id);
        this.report((0, news_serializator_1.deserializeToClickhouse)(newsWithAuthor));
        return newsWithAuthor;
    }
    delete(id) {
        return this.newsRepository.delete(id);
    }
    async report(msg) {
        // add try catch
        const queue = process.env.NEWS_ANALYTICS_REQUEST_QUEUE;
        await this.queueWorker.sendMessage(queue, JSON.stringify({ data: msg }));
    }
}
exports.default = NewsService;
//# sourceMappingURL=news.service.js.map