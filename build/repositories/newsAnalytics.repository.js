"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
class NewsAnalyticsRepository {
    constructor(clickhouseClient) {
        this.clickhouseClient = clickhouseClient;
    }
    async insert(data) {
        try {
            return await this.clickhouseClient.insert({
                table: 'news_history',
                values: [data],
                format: 'JSONObjectEachRow'
            });
        }
        catch (error) {
            throw new entities_1.RepositoryError({
                location: 'NewsAnalyticsRepository.insert',
                message: error
            });
        }
    }
}
exports.default = NewsAnalyticsRepository;
//# sourceMappingURL=newsAnalytics.repository.js.map