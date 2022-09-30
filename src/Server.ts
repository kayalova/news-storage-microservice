import express from 'express'
import NewsRouter from './routes/news.router'
import { connection as dbconnection } from './config/db.config'

export default class Server {
    private app: express.Application
    public newsRouter: NewsRouter

    constructor(newsRouter: NewsRouter) {
        this.newsRouter = newsRouter
    }

    public async init() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true })) // ?

        this.configuration()
        this.routes()
    }

    public routes() {
        this.app.use('/api', this.newsRouter.router)
    }

    public configuration() {
        this.app.set('port', process.env.APP_PORT || 3001) // 3001 or "3001" ?
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
