import express from 'express'
import session from 'express-session'
import connectRedis from "connect-redis"
import { createClient } from "redis"

import { connection as dbconnection } from './storage/postgres'
import NewsRouter from './routes/news.router'
import UserRouter from './routes/user.router'
import AuthRouter from './routes/auth.router'

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
        redisClient: ReturnType<typeof createClient>
    ) {
        this.newsRouter = newsRouter
        this.userRouter = userRouter
        this.authRouter = authRouter
        this.redisClient = redisClient
    }

    public async init() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true })) // ?

        this.configuration()
        this.routes()
    }

    public routes() {
        this.app.use('/api/news', this.newsRouter.router)
        this.app.use('/api/users', this.userRouter.router)
        this.app.use('/api/auth', this.authRouter.router)
    }

    public configuration() {
        const RedisStore = connectRedis(session)

        this.app.set('port', process.env.APP_PORT || 3001) // 3001 or "3001" ?
        this.app.use(session({
            store: new RedisStore({ client: this.redisClient }), // todo: перенсти клиента в storage
            'secret': 'ILOVESAM', // todo: перенести в process.env или другйо конфиг
            'saveUninitialized': true,
        }));
    }

    public start() {
        const PORT = this.app.get('port');

        dbconnection.then(_ => {
            console.log('Connected to db')
            this.app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`)

            })
        }).catch(e => console.log(e))
    }
}
