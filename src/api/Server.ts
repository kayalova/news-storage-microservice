import express, { Request, Response } from 'express'
import NewsController from './news-broker'

export default class Server {
    private app: express.Application
    private controller: NewsController

    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.configuration()

        this.controller = new NewsController()
    }

    public configuration() {
        this.app.set('port', process.env.APP_PORT || 3001)
    }

    public routes() {
        this.app.use('/api/news', this.controller.router)
    }

    public start() {
        const PORT = this.app.get('port');

        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }

}
