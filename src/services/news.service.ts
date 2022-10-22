import { INewsCreateOptions, INewsFindOptions, INewsHistory, IPagination, UpdateBody } from '../models';
import { deserializeToClickhouse } from '../repositories/news.serializator';
import NewsRepository from '../repositories/news.repository';
import QueueWorker from '../workers/QueueWorker';
import { NewsEntity } from '../entities';

class NewsService {
    private queueWorker: QueueWorker
    private newsRepository: NewsRepository

    constructor(queueWorker: QueueWorker, repository: NewsRepository) {
        this.newsRepository = repository
        this.queueWorker = queueWorker
    }


    getAll(options: INewsFindOptions, pagination?: IPagination): Promise<Array<NewsEntity>> {
        return this.newsRepository.get(options, pagination)
    }

    getOne(id: number): Promise<NewsEntity> {
        return this.newsRepository.getOne(id)
    }

    async create(options: INewsCreateOptions): Promise<NewsEntity> {
        const news = await this.newsRepository.create(options)

        this.report(deserializeToClickhouse(news))

        return news
    }

    async update(id: number, body: UpdateBody): Promise<NewsEntity> {
        await this.newsRepository.update(id, body)

        const newsWithAuthor = await this.getOne(id)

        this.report(deserializeToClickhouse(newsWithAuthor))

        return newsWithAuthor
    }

    delete(id: number): Promise<Boolean> {
        return this.newsRepository.delete(id)
    }


    async report(msg: INewsHistory) {
        // add try catch
        const queue = process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string
        await this.queueWorker.sendMessage(queue, JSON.stringify({ data: msg }))
    }

}

export default NewsService