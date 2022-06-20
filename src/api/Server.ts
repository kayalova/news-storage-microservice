import express, { Router } from 'express'
import QueueWorker from '../workers/QueueWorker'
import NewsControllers from './news.controller'

export default class Server {
    private app: express.Application
    public newsController: NewsControllers

    constructor(queueworker: QueueWorker) {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.newsController = new NewsControllers(queueworker)
        this.configuration()
        this.routes()
    }

    public routes() {
        this.app.use('/api/news', this.newsController.router)
    }

    public configuration() {
        this.app.set('port', process.env.APP_PORT || 3001)
    }

    public start() {
        const PORT = this.app.get('port');
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
}
