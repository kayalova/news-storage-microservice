import { DataSource, UpdateResult } from "typeorm";

import { UserEntity, NewsEntity, RepositoryError } from "../entities";
import { INewsCreateOptions, INewsFindOptions, IPagination, UpdateBody } from "../models";

class NewsRepository {
    private newsRepository;
    private userRepository;

    constructor(appDataSource: DataSource) {
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
        } catch (error: any) {
            throw new RepositoryError({
                location: "NewsRepository.get",
                message: error.message
            })
        }
    }

    async getOne(id: number): Promise<NewsEntity | null> {
        try {
            return await this.newsRepository.findOne({ // почему fail
                where: { id },
                relations: {
                    author: true
                },
                select: {
                    author: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            })
        } catch (error: any) {
            throw new RepositoryError({
                location: "NewsRepository.getOne",
                message: error.message
            })
        }
    }

    async create(create: INewsCreateOptions): Promise<NewsEntity> {
        try {
            const author = await this.userRepository.findOneOrFail({
                where: { id: create.author },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                }
            })


            const news = this.newsRepository.create({ ...create, author })

            const result = await this.newsRepository.save(news)

            if (!result) {
                throw new RepositoryError({
                    location: "NewsRepository.create",
                    message: "Got false returning value after save request"
                })
            }

            return news
        } catch (error: any) {
            throw new RepositoryError({
                location: "NewsRepository.create",
                message: error.message
            })
        }
    }


    async update(id: number, updateBody: UpdateBody): Promise<UpdateResult> {
        try {

            const result = await this.newsRepository.update({ id }, { ...updateBody, 'updatedAt': new Date() })

            if (!result.affected) {
                throw new RepositoryError({
                    location: "NewsRepository.update",
                    message: "Got UpdateResult.affected false"
                })
            }

            return result

        } catch (error: any) {
            throw new RepositoryError({
                location: "NewsRepository.update",
                message: error.message
            })
        }
    }

    async delete(id: number): Promise<Boolean> {
        try {
            const result = await this.newsRepository.delete(id)

            if (!result.affected) {
                throw new RepositoryError({
                    location: "NewsRepository.delete",
                    message: "Could not delete the record. Please provide existing news id. You can check this making /api/news/get/:id request"
                })
            }

            return true
        } catch (error: any) {
            throw new RepositoryError({
                location: "NewsRepository.delete",
                message: error.message
            })
        }
    }
}

export default NewsRepository