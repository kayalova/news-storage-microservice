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
            const news = await this.repository.find() // не возвращает ошибку.. в типе ответа функции не указывается что может вернуться ошибка, так устроена система типов
            console.log(`news are ${JSON.stringify(news)}`)
            return news
        } catch (error) { // error это всегда класс
            /* 
            
            try {
                const news = service.getNews();
                } catch (e) {
                if (e instanceof ErrorRepository) {
                    res.send({code: 400, error: “RepositoryError”});
                } else if (e instanceof JsonEncoderError) {
                res.send({code: 400, error: “JsonEncoderError”});
                } else  {
                res.send({code: 400, error: “UnknownError”});    
                }
            }
            */
            console.log(`NewsRepository.getNews error: ${error}`)
            // создать класс ошибки,
            throw Error(JSON.stringify(error))
            // throw Error()// throw Error() vs throw new Error()
        }

        // return [] //TODO: возвращать ошибку вместо пустого массива
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