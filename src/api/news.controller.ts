import { Router, Request, Response, NextFunction } from 'express'
import QueueWorker from '../workers/QueueWorker';
import NewsService from '../services/news.service';
import { DataSource } from 'typeorm';

export default class NewsControllers {
    public router: Router;
    public newsService: NewsService;
    private appDataSource: DataSource

    constructor(queworker: QueueWorker, appDataSource: DataSource) {
        this.newsService = new NewsService(queworker, appDataSource)
        this.router = Router()
        this.middlewares()
        this.routes()
    }

    public get = async (req: Request, res: Response) => {
        try {
            const news = await this.newsService.get()
            res.send({
                request: { method: req.method, params: req.params },
                response: news
            })
        } catch (error) {
            console.log(`NewsController.get error: ${error}`)
        }
    }

    public update = async (req: Request, res: Response) => {
        try {
            const news = await this.newsService.updateOne(req.params.data)
            res.send({
                request: { method: req.method, params: req.params },
                response: news
            })
        } catch (error) {
            console.log(`NewsController.update error: ${error}`)
        }
    }


    public middlewares() {
        this.router.use(this.logRequest)
    }


    public routes() {
        this.router.get('/', this.get) // !
        this.router.put('/:id', this.update)
    }

    public logRequest(req: Request, res: Response, next: NextFunction) {
        console.log(`NewsController.${req.method} request`)
        next()
    }
}