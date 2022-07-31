import express from 'express'
import QueueWorker from './workers/QueueWorker'
import NewsControllers from './api/news.controller'
import { connection } from './config/db.config'
import { DataSource } from 'typeorm'

export default class Server {
    private app: express.Application
    public newsController: NewsControllers
    private appDataSource: DataSource

    constructor(queueworker: QueueWorker, appDataSource: DataSource) {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.appDataSource = appDataSource
        this.newsController = new NewsControllers(queueworker, appDataSource)
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
            connection.then(ds => {

            }).catch(e => console.log(e))
        })
    }
}
