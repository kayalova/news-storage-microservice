import { Router, Request, Response, NextFunction } from 'express'
import NewsService from '../services/news.service';

export default class NewsRouter {
    public router: Router;
    public newsService: NewsService;

    constructor(newsService: NewsService) {
        this.newsService = newsService

        this.router = Router()
        this.middlewares()
        this.routes()
    }

    public get = async (req: Request, res: Response) => {
        console.log(1)
    }


    public middlewares() {
        this.router.use(this.logRequest)
    }


    public routes() {
        this.router.get('/news/', this.get)
        // this.router.put('/news/:id', this.update)
    }

    public logRequest(req: Request, res: Response, next: NextFunction) {
        console.log(`NewsRouter.${req.method} request`)
        next()
    }
}