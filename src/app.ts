import 'dotenv/config'
import "reflect-metadata"
import Server from './Server'
import { AppdataSource } from './config/db.config'

import QueueWorker from './workers/QueueWorker'
import NewsService from './services/news.service'
import NewsRouter from './routes/news.router'

(async () => {
    const queueWorker = new QueueWorker()
    await queueWorker.init()

    const newsService = new NewsService(queueWorker, AppdataSource)
    const newsRouter = new NewsRouter(newsService)

    const server = new Server(newsRouter);
    server.init()
    server.start()

})()

