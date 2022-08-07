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
        return this.repository.getNews()
    }

    async getOne(options: FindOneOptions<NewsEntity>): Promise<NewsEntity | null> {
        return this.repository.getOne(options)
    }


    // подумать над структурой аргумента
    async updateOne(data: any) {
        try {
            await this.repository.update()
            this.report({})

        } catch (error) {

        }
    }


    async createOne(news: NewsEntity) {
        return this.repository.createOne(news)
    }




    async report(msg: any) {
        await this.queueWorker.sendMessage(process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string, JSON.stringify({ data: msg }))

        // this.queueWorker.consumeMessage(process.env.NEWS_UPDATE_QUEUE as string, async (data: any) => {
        // const msg = JSON.parse(data?.content.toString())
        // })
    }

}
