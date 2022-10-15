import { DataSource, FindOneOptions } from "typeorm";
import { UserEntity } from "../entities";
import { NewsEntity } from '../entities/News.entity'
import { INewsCreateOptions, INewsFindOptions, IPagination, UpdateBody } from "../models";

export default class NewsRepository {
    private appDataSource: DataSource
    private newsRepository;
    private userRepository;

    constructor(appDataSource: DataSource) {
        this.appDataSource = appDataSource
        this.newsRepository = appDataSource.getRepository(NewsEntity)
        this.userRepository = appDataSource.getRepository(UserEntity)
    }

    async get(filter: INewsFindOptions, pagination?: IPagination): Promise<Array<NewsEntity>> {
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

    async create(create: INewsCreateOptions): Promise<any> {
        try {
            const author = await this.userRepository.findOneByOrFail({ id: create.author })

            const news = this.newsRepository.create({ ...create, author })

            const result = await this.newsRepository.save(news) // todo: подумать над ответом
            if (!result) {
                throw new Error("Can not create news")
            }

            return news
        } catch (error) {
            console.error(error)
            throw new Error(JSON.stringify(error))
        }
    }


    async update(id: number, updateBody: UpdateBody): Promise<any> {
        try {

            const result = await this.newsRepository.createQueryBuilder()
                .update(updateBody)
                .where({ id })
                .returning('*')
                .execute()

            // console.log(result.raw) // raw(pure postgres js object) != typeorm entity, в таких случаях пишут сериализаторы из js -> orm

            console.log(result)
            if (!result.affected) {
                throw new Error("Could not update news")
            }

            return result.raw[0]

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