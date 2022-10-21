import { ClickHouseClient } from '@clickhouse/client'
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
        } catch (error) {
            console.error(JSON.stringify(error))
            throw new Error(JSON.stringify(error))
        }
    }
}

export default NewsAnalyticsRepository