import { DataSource, FindOneOptions } from "typeorm";
import { NewsEntity } from '../entities/News.entity'

export default class NewsRepository {
    private appDataSource: DataSource
    private repository;

    constructor(appDataSource: DataSource) {
        this.appDataSource = appDataSource
        this.repository = appDataSource.getRepository(NewsEntity)
    }

    // поиск по параметрам, добавить параметры
    async getNews() {
        try {
            const news = await this.repository.find()
            console.log(`news are ${JSON.stringify(news)}`)
            return news
        } catch (error) {
            console.log(`NewsRepository.getNews error: ${error}`)
        }

        return [] //TODO: возвращать ошибку вместо пустого массива
    }


    // вторая таблица
    async getOne(options: FindOneOptions<NewsEntity>): Promise<NewsEntity | null> {
        try {
            const news = await this.repository.findOne(options)
            console.log(`news are ${JSON.stringify(news)}`)
            return news
        } catch (error) {
            console.log(`NewsRepository.getNews error: ${error}`)
        }

        return null //TODO: уточнить
    }

    async update() {

    }

    // добавление нового объекта
    async createOne(news: NewsEntity) {

    }
}