import { ClickHouseClient } from '@clickhouse/client'

class NewsAnalyticsRepository {
    private clickhouseClient;

    constructor(clickhouseClient: ClickHouseClient) {
        this.clickhouseClient = clickhouseClient
    }

    async insert(data: any) {
        try {
            return await this.clickhouseClient.insert({ table: 'news_history', values: [JSON.stringify(data)], format: 'JSONObjectEachRow' })

            /* 
            values: ['{}', ]
            */
        } catch (error) {
            console.error(JSON.stringify(error))
            throw new Error(JSON.stringify(error))
        }
    }
}

export default NewsAnalyticsRepository