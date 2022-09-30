import amqp from 'amqplib'
import { DataSource, FindOneOptions } from 'typeorm';

import { NewsEntity } from '../entities/News.entity';
import NewsRepository from '../repository/news.repository';
import QueueWorker from '../workers/QueueWorker';
import NewsAnalyticsService from './news_analytics.service';

export default class NewsService {
    private queueWorker: QueueWorker
    private newsAnalyticsService: NewsAnalyticsService
    private repository: NewsRepository

    constructor(queueWorker: QueueWorker, appDataSource: DataSource) {
        this.queueWorker = queueWorker
        this.repository = new NewsRepository(appDataSource)
        this.newsAnalyticsService = new NewsAnalyticsService(queueWorker, this.repository)
        this.newsAnalyticsService.consume()
    }


    async getAll() {

    }

    async getOne(options: FindOneOptions<NewsEntity>) {
    }


    async updateOne(data: any) {

    }

    async createOne(news: NewsEntity) {
    }




    async report(msg: any) {
        await this.queueWorker.sendMessage(process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string, JSON.stringify({ data: msg }))

        // this.queueWorker.consumeMessage(process.env.NEWS_UPDATE_QUEUE as string, async (data: any) => {
        // const msg = JSON.parse(data?.content.toString())
        // })
    }

}
