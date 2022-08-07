import { Router, Request, Response, NextFunction } from 'express'
import QueueWorker from '../workers/QueueWorker';
import NewsService from '../services/news.service';
import { DataSource } from 'typeorm';
import { NewsEntity } from '../entities/News.entity';

export default class NewsControllers {
    public router: Router;
    public newsService: NewsService;

    constructor(queworker: QueueWorker, appDataSource: DataSource) {
        this.newsService = new NewsService(queworker, appDataSource)
        this.router = Router()
        this.middlewares()
        this.routes()
    }

    // TODO: добавить методу findOptions, реализовать поиск по параметрам
    public get = async (req: Request, res: Response) => {
        try { //TODO: получается 2 try catch
            const news: Array<NewsEntity> = await this.newsService.getAll()
            res.send({
                request: { method: req.method, params: req.params },
                response: news
            })
        } catch (error) {
            console.log(`NewsController.get error: ${error}`)
        }
    }

    // TODO: цеплять вторую таблицу, дополнить получаемый объект второй таблицей
    public getOne = async (req: Request, res: Response) => {
        try { //TODO: получается 2 try catch
            const news: NewsEntity | null = await this.newsService.getOne(req.body.data.options)
            res.send({
                request: { method: req.method, params: req.params },
                response: news
            })
        } catch (error) {
            console.log(`NewsController.get error: ${error}`)
        }
    }

    // TODO: добавить обновление объекта в бд по параметрам
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

    // TODO: создать роут на создание новости


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