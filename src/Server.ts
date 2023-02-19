import express from 'express'
import session from 'express-session'
import { createClient } from "redis"
import connectRedis from "connect-redis"

import { postgresClient, redisClient } from './storage'

import { NewsRouter, UserRouter, AuthRouter } from './routes/'

export default class Server {
    private app: express.Application
    public newsRouter: NewsRouter
    public userRouter: UserRouter
    public authRouter: AuthRouter
    public redisClient: ReturnType<typeof createClient>

    constructor(
        newsRouter: NewsRouter,
        userRouter: UserRouter,
        authRouter: AuthRouter,
    ) {
        this.newsRouter = newsRouter
        this.userRouter = userRouter
        this.authRouter = authRouter
        this.redisClient = redisClient
    }

    public async init() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        await this.runStorageClients()

        this.configuration()
        this.routes()
    }

    public async runStorageClients() {
        try {
            await this.redisClient.connect()
            console.log('Successfully connected to redis')
            await postgresClient.initialize()
            console.log('Successfully connected to postgresql')

        } catch (error) {
            console.error('Server.runStorageClients error', error)
            process.exit(1)
        }
    }

    public routes() {
        this.app.use('/api/news', this.newsRouter.router)
        this.app.use('/api/users', this.userRouter.router)
        this.app.use('/api/auth', this.authRouter.router)
    }

    public configuration() {
        this.app.set('port', process.env.APP_PORT || 3001)

        const RedisStore = connectRedis(session)

        this.app.use(session({
            store: new RedisStore({ client: this.redisClient }),
            secret: process.env.SESSION_SECRET as string,
            saveUninitialized: false,
        }));
    }

    public start() {
        const PORT = this.app.get('port');
        this.app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    }
}
