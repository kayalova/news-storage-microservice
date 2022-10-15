import { Router, Request, Response, NextFunction } from 'express'
import { logRequest } from '../middleware';
import { IGetNewsQuery, INewsFindOptions, INewsCreateBody, UpdateQuery, UpdateBody } from '../models/news.model';
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
        try {
            const {
                id,
                header,
                description,
                authorFirstName: firstName,
                authorLastName: lastName,
                email,
                skip,
                take
            } = req.query as IGetNewsQuery

            console.log(req.session)

            const filter: INewsFindOptions = {
                id,
                header,
                description,
                author: {
                    firstName,
                    lastName,
                    email
                }
            }

            const news = await this.newsService.getAll(filter, { skip, take })
            res.send({
                news
            })

        } catch (error) {
            res.send({
                error: "Get error",
                errorMessage: error
            })
        }
    }

    public getOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const article = await this.newsService.getOne(Number(id))

            res.send({
                article
            })

        } catch (error) {
            res.send({
                error: "Get one error",
                errorMessage: error
            })
        }

    }

    public create = async (req: Request, res: Response) => {
        try {
            const { header, description, authorId } = req.body as INewsCreateBody

            await this.newsService.create({ author: authorId, header, description })

            res.status(201).send({
                statusMessage: "Successfully created",
            })
        } catch (error) {
            res.send({
                error: "Create error",
                errorMessage: error
            })
        }
    }

    public update = async (req: Request, res: Response) => {
        try {

            const { header, description, id } = req.body as UpdateQuery

            const result = await this.newsService.update(id, { header, description } as UpdateBody)

            res.send(result)
        } catch (error) {
            res.send({
                error: "Update error",
                errorMessage: error
            })
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            await this.newsService.delete(Number(id))

            res.send({
                success: true,
                message: "Successfully deleted"
            })
        } catch (error) {
            res
                .status(404)
                .send({
                    error: "Delete error",
                    errorMessage: error
                }) // возвращать ли 404 когда отсутствует сущность
        }
    }

    public middlewares() {
        this.router.use(logRequest('News.router'))
    }

    public routes() {
        this.router.post('/create', this.create)
        this.router.get('/:id', this.getOne) //news vs /news/
        this.router.get('/', this.get) // /news vs /news/
        this.router.put('/update', this.update)
        this.router.delete('/delete/:id', this.delete)
    }

}