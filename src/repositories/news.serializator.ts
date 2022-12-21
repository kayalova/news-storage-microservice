import { NewsEntity } from "../entities"
import { INewsHistory } from '../models'
import { formatDateToClickhouse } from "../utils"

// from typeorm entity to clickhouse
export function deserializeToClickhouse(news: NewsEntity): INewsHistory {
    console.log(3);

    return {
        news_id: news.id,
        header: news.header,
        description: news.description,
        created_at: formatDateToClickhouse(new Date(news.createdAt).toISOString()),
        updated_at: news.updatedAt && formatDateToClickhouse(new Date(news.updatedAt).toISOString()),
        author: JSON.stringify({
            id: news.author.id,
            firstName: news.author.firstName,
            lastName: news.author.lastName,
            email: news.author.email,
        })
    }
}
