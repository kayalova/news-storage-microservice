"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
class NewsRepository {
    constructor(appDataSource) {
        this.appDataSource = appDataSource;
        this.newsRepository = appDataSource.getRepository(entities_1.NewsEntity);
        this.userRepository = appDataSource.getRepository(entities_1.UserEntity);
    }
    async get(filter, pagination) {
        try {
            const news = await this.newsRepository.find({
                where: filter,
                skip: pagination === null || pagination === void 0 ? void 0 : pagination.skip,
                take: pagination === null || pagination === void 0 ? void 0 : pagination.take
            });
            return news;
        }
        catch (error) {
            throw new entities_1.RepositoryError({
                location: "NewsRepository.get",
                message: error
            });
        }
    }
    async getOne(id) {
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
            });
        }
        catch (error) {
            throw new entities_1.RepositoryError({
                location: "NewsRepository.getOne",
                message: error
            });
        }
    }
    async create(create) {
        try {
            const author = await this.userRepository.findOneByOrFail({ id: create.author });
            const news = this.newsRepository.create(Object.assign(Object.assign({}, create), { author }));
            const result = await this.newsRepository.save(news);
            if (!result) {
                throw new entities_1.RepositoryError({
                    location: "NewsRepository.create",
                    message: "Got false returning value after save request"
                });
            }
            return news;
        }
        catch (error) {
            throw new entities_1.RepositoryError({
                location: "NewsRepository.create",
                message: error
            });
        }
    }
    async update(id, updateBody) {
        try {
            const result = await this.newsRepository.update({ id }, Object.assign(Object.assign({}, updateBody), { 'updatedAt': new Date() }));
            if (!result.affected) {
                throw new entities_1.RepositoryError({
                    location: "NewsRepository.update",
                    message: "Got UpdateResult.affected false"
                });
            }
            return result;
        }
        catch (error) {
            throw new entities_1.RepositoryError({
                location: "NewsRepository.update",
                message: error
            });
        }
    }
    async delete(id) {
        try {
            const result = await this.newsRepository.delete(id);
            if (!result.affected) {
                throw new entities_1.RepositoryError({
                    location: "NewsRepository.delete",
                    message: "Got DeleteResult.affected false"
                });
            }
            return true;
        }
        catch (error) {
            throw new entities_1.RepositoryError({
                location: "NewsRepository.delete",
                message: error
            });
        }
    }
}
exports.default = NewsRepository;
//# sourceMappingURL=news.repository.js.map