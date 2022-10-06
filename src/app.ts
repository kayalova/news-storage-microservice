import 'dotenv/config'
import "reflect-metadata"
import Server from './Server'
import { appDataSource } from './config/db.config'

import QueueWorker from './workers/QueueWorker'
import NewsService from './services/news.service'
import NewsRouter from './routes/news.router'
import NewsRepository from './repositories/news.repository'
import UserRepository from './repositories/user.repository'
import UserService from './services/user.service'
import UserRouter from './routes/user.router'

(async () => {
    const queueWorker = new QueueWorker()
    await queueWorker.init()

    const userRepository = new UserRepository(appDataSource)
    const userService = new UserService(userRepository)
    const userRouter = new UserRouter(userService)

    const newsRepository = new NewsRepository(appDataSource)
    const newsService = new NewsService(queueWorker, newsRepository)
    const newsRouter = new NewsRouter(newsService)

    const server = new Server(newsRouter, userRouter);
    server.init()
    server.start()

})()

