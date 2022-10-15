import { stringify } from "querystring"
import { NewsEntity } from "../entities"

// serializator - from sql to typeorm entity
export function deserializeToClickhouse(news: NewsEntity) {

    return { // создать интерфейс
        news_id: news.id,
        header: news.header,
        description: news.description,
        created_at: news.createdAt,
        updated_at: news.updatedAt,
        user: {
            id: news.author.id,
            firstNamre: news.author.firstName,
            lastName: news.author.lastName,
            email: news.author.email,
            role: news.author.role
        }

    }
}

