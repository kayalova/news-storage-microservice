import { Router, Request, Response, NextFunction } from 'express'
import QueueWorker from '../workers/QueueWorker';
import NewsService from '../services/news.service';

export default class NewsControllers {
    public router: Router;
    private newsService: NewsService;

    constructor(queworker: QueueWorker) {
        this.router = Router()
        this.middlewares()
        this.routes()
        this.newsService = new NewsService(queworker)
    }

    public get() {
        try {
            const news = this.newsService.get()
        } catch (error) {
            console.log(`NewsController.get error: ${error}`)
        }
    }

    public update() {
        try {

        } catch (error) {
            console.log(`NewsController.update error: ${error}`)
        }
    }


    public middlewares() {
        this.router.use(this.logRequest)
    }


    public routes() {
        this.router.get('/', this.get)
        this.router.put('/:id', this.update)
    }

    public logRequest(req: Request, res: Response, next: NextFunction) {
        console.log(`NewsController.${req.method} request`)
        next()
    }
}