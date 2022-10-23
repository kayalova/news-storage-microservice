import { ClickHouseClient } from '@clickhouse/client'

import { RepositoryError } from '../entities';
import { INewsHistory } from '../models';

class NewsAnalyticsRepository {
    private clickhouseClient;

    constructor(clickhouseClient: ClickHouseClient) {
        this.clickhouseClient = clickhouseClient
    }

    async insert(data: INewsHistory) {
        try {
            return await this.clickhouseClient.insert({
                table: 'news_history',
                values: [data],
                format: 'JSONObjectEachRow'
            })
        } catch (error: any) {
            throw new RepositoryError({
                location: 'NewsAnalyticsRepository.insert',
                message: error.message
            })
        }
    }
}

export default NewsAnalyticsRepository