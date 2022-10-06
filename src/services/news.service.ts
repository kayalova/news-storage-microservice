import { NewsEntity } from '../entities/News.entity';
import { INewsCreateOptions, INewsFindOptions, IPagination, UpdateBody } from '../models';
import NewsRepository from '../repositories/news.repository';
import QueueWorker from '../workers/QueueWorker';
import NewsAnalyticsService from './news_analytics.service';

export default class NewsService {
    private queueWorker: QueueWorker
    private newsAnalyticsService: NewsAnalyticsService
    private newsRepository: NewsRepository

    constructor(queueWorker: QueueWorker, repository: NewsRepository) {
        this.newsRepository = repository
        this.queueWorker = queueWorker
        this.newsAnalyticsService = new NewsAnalyticsService(queueWorker, this.newsRepository)
        this.newsAnalyticsService.consume()
    }


    getAll(options: INewsFindOptions, pagination?: IPagination): Promise<Array<NewsEntity>> {
        return this.newsRepository.get(options, pagination)
    }

    getOne(id: number): Promise<NewsEntity> {
        return this.newsRepository.getOne(id)
    }

    create(options: INewsCreateOptions): Promise<NewsEntity> {
        return this.newsRepository.create(options)
    }

    update(id: number, body: UpdateBody): Promise<Boolean> {
        return this.newsRepository.update(id, body)
    }

    delete(id: number): Promise<Boolean> {
        return this.newsRepository.delete(id)
    }



    async report(msg: any) {
        await this.queueWorker.sendMessage(process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string, JSON.stringify({ data: msg }))

        // this.queueWorker.consumeMessage(process.env.NEWS_UPDATE_QUEUE as string, async (data: any) => {
        // const msg = JSON.parse(data?.content.toString())
        // })
    }

}
