import { NewsEntity } from '../entities/News.entity';
import { INewsCreateOptions, INewsFindOptions, IPagination, UpdateBody } from '../models';
import NewsRepository from '../repositories/news.repository';
import { deserializeToClickhouse } from '../repositories/news.serializator';
import QueueWorker from '../workers/QueueWorker';
import NewsAnalyticsService from './news_analytics.service';
import UserService from './user.service';

export default class NewsService {
    private queueWorker: QueueWorker
    // private newsAnalyticsService: NewsAnalyticsService
    private newsRepository: NewsRepository
    private userService: UserService

    constructor(queueWorker: QueueWorker, repository: NewsRepository, userService: UserService) {
        this.newsRepository = repository
        this.queueWorker = queueWorker
        this.userService = userService
        // this.newsAnalyticsService = new NewsAnalyticsService(queueWorker)
        // this.newsAnalyticsService.consume()
    }


    getAll(options: INewsFindOptions, pagination?: IPagination): Promise<Array<NewsEntity>> {
        return this.newsRepository.get(options, pagination)
    }

    getOne(id: number): Promise<NewsEntity> {
        return this.newsRepository.getOne(id)
    }

    async create(options: INewsCreateOptions): Promise<any> {
        try {
            const news = await this.newsRepository.create(options)

            this.report(deserializeToClickhouse(news)) // ждать нет смысла, проверить нужен ли then

            return news

        } catch (error) {
            throw new Error(JSON.stringify(error))
        }

    }

    async update(id: number, body: UpdateBody): Promise<any> {
        const news = await this.newsRepository.update(id, body)

        if (news) {
            const user = await this.userService.getById(news.user_id)
            const id = news.user_id;

            delete news.user_id;
            this.report({ ...news, userId: id })


            return { ...news, author: { firstName: user?.firstName, lastName: user?.lastName, id } }
        }

        // return isUpdated
    }

    delete(id: number): Promise<Boolean> {
        return this.newsRepository.delete(id)
    }



    async report(msg: any) {
        const queue = process.env.NEWS_ANALYTICS_REQUEST_QUEUE as string
        await this.queueWorker.sendMessage(queue, JSON.stringify({ data: msg }))

        // this.queueWorker.consumeMessage(process.env.NEWS_UPDATE_QUEUE as string, async (data: any) => {
        // const msg = JSON.parse(data?.content.toString())
        // })
    }

}
