import 'dotenv/config'
import "reflect-metadata"

import { createClient } from "redis"

import Server from './Server'
import { appDataSource } from './storage/postgres'

import QueueWorker from './workers/QueueWorker'
import NewsService from './services/news.service'
import NewsRouter from './routes/news.router'
import NewsRepository from './repositories/news.repository'
import UserRepository from './repositories/user.repository'
import UserService from './services/user.service'
import UserRouter from './routes/user.router'
import AuthService from './services/auth.service'
import AuthRouter from './routes/auth.router'
import NewsAnalyticsService from './services/news_analytics.service'

(async () => {
    const redisClient = createClient({
        // url: 'redis://127.0.0.1:6379', ??? excuse me
        url: 'redis://localhost:6379',
        legacyMode: true
    })

    try {
        await redisClient.connect()
    } catch (error) {
        console.error(error)
    }


    const queueWorker = new QueueWorker()
    await queueWorker.init()

    const userRepository = new UserRepository(appDataSource)
    const userService = new UserService(userRepository)
    const userRouter = new UserRouter(userService)

    const newsRepository = new NewsRepository(appDataSource)
    const newsService = new NewsService(queueWorker, newsRepository, userService)
    const newsRouter = new NewsRouter(newsService)

    const newsAnalyticsService = new NewsAnalyticsService(queueWorker)
    newsAnalyticsService.consume()

    const authService = new AuthService(userService)
    const authRouter = new AuthRouter(authService)

    const server = new Server(newsRouter, userRouter, authRouter, redisClient);
    server.init()
    server.start()

})()

