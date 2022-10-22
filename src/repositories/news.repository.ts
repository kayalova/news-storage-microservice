import { DataSource, UpdateResult } from "typeorm";
import { UserEntity, NewsEntity, RepositoryError } from "../entities";
import { INewsCreateOptions, INewsFindOptions, IPagination, UpdateBody } from "../models";

class NewsRepository {
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
            throw new RepositoryError({
                location: "NewsRepository.get",
                message: error
            })
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
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            })
        } catch (error) {
            throw new RepositoryError({
                location: "NewsRepository.getOne",
                message: error
            })
        }

    }

    async create(create: INewsCreateOptions): Promise<NewsEntity> {
        try {
            const author = await this.userRepository.findOneByOrFail({ id: create.author })

            const news = this.newsRepository.create({ ...create, author })

            const result = await this.newsRepository.save(news)
            if (!result) {
                throw new RepositoryError({
                    location: "NewsRepository.create",
                    message: "Got false returning value after save request"
                })
            }

            return news
        } catch (error) {
            throw new RepositoryError({
                location: "NewsRepository.create",
                message: error
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

        } catch (error) {
            throw new RepositoryError({
                location: "NewsRepository.update",
                message: error
            })
        }

    }

    async delete(id: number): Promise<Boolean> {
        try {
            const result = await this.newsRepository.delete(id)

            if (!result.affected) {
                throw new RepositoryError({
                    location: "NewsRepository.delete",
                    message: "Got DeleteResult.affected false"
                })
            }

            return true
        } catch (error) {
            throw new RepositoryError({
                location: "NewsRepository.delete",
                message: error
            })
        }
    }
}

export default NewsRepository