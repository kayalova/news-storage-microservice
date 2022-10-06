import { DataSource, FindOneOptions } from "typeorm";
import { UserEntity } from "../entities";
import { NewsEntity } from '../entities/News.entity'
import { ICreateOptions, IFindOptions, IPagination, UpdateBody } from "../models";

export default class NewsRepository {
    private appDataSource: DataSource
    private newsRepository;
    private userRepository;

    constructor(appDataSource: DataSource) {
        this.appDataSource = appDataSource
        this.newsRepository = appDataSource.getRepository(NewsEntity)
        this.userRepository = appDataSource.getRepository(UserEntity)
    }

    async get(filter: IFindOptions, pagination?: IPagination): Promise<Array<NewsEntity>> {
        try {
            const news = await this.newsRepository.find({
                where: filter,
                skip: pagination?.skip,
                take: pagination?.take
            })

            return news
        } catch (error) {
            throw new Error(JSON.stringify(error))
        }
    }

    async getOne(id: number): Promise<NewsEntity> {
        try {
            return await this.newsRepository.findOneOrFail({
                where: { id },
                relations: {
                    author: true
                },
                select: {
                    author: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            })
        } catch (error) {
            throw new Error(JSON.stringify(error)) // doest not work, todo: handle
        }

    }

    async create(create: ICreateOptions): Promise<NewsEntity> {
        try {
            const author = await this.userRepository.findOneByOrFail({ id: create.author })

            const news = this.newsRepository.create({ ...create, author })

            return await this.newsRepository.save(news) // todo: подумать над ответом
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error))
        }
    }


    async update(id: number, updateBody: UpdateBody): Promise<Boolean> {
        try {
            const result = await this.newsRepository.update(
                { id }, // когда передаем ид котрого нет, ошибка не выбрасывается
                updateBody
            )

            if (!result.affected) {
                throw new Error("Could not update news")
            }

            return true

        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error))
        }

    }

    async delete(id: number): Promise<Boolean> {
        try {
            const result = await this.newsRepository.delete(id)

            if (!result.affected) {
                throw new Error("Could not delete news")
            }

            return true
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error))
        }
    }
}