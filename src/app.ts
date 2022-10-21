import 'dotenv/config'
import "reflect-metadata"

import Server from './Server'
import { postgresClient, clickhouseClient } from './storage'
import { NewsRouter, UserRouter, AuthRouter } from './routes'
import QueueWorker from './workers/QueueWorker'
import {
    NewsService,
    UserService,
    AuthService,
    NewsAnalyticsService
} from './services'
import {
    NewsRepository,
    UserRepository,
    NewsAnalyticsRepository
} from './repositories'
import rabbitmqConnection from './transport/rabbitmq.transport'


(async () => {
    await rabbitmqConnection

    const queueWorker = new QueueWorker()
    await queueWorker.init()

    const newsAnalyticsRepository = new NewsAnalyticsRepository(clickhouseClient)
    const newsAnalyticsService = new NewsAnalyticsService(queueWorker, newsAnalyticsRepository)
    newsAnalyticsService.consume()

    const userRepository = new UserRepository(postgresClient)
    const userService = new UserService(userRepository)
    const userRouter = new UserRouter(userService)

    const newsRepository = new NewsRepository(postgresClient)
    const newsService = new NewsService(queueWorker, newsRepository)
    const newsRouter = new NewsRouter(newsService)

    const authService = new AuthService(userService)
    const authRouter = new AuthRouter(authService)

    const server = new Server(newsRouter, userRouter, authRouter);
    await server.init()
    server.start()

})()

