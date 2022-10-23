import { Router, Request, Response, NextFunction } from 'express'
import { HttpResponseEntity, RepositoryError } from '../entities';

import { checkUserLogin, logRequest } from '../middleware';
import {
    UpdateBody,
    UpdateQuery,
    IGetNewsQuery,
    INewsCreateBody,
    INewsFindOptions,
} from '../models';
import { NewsService } from '../services';

class NewsRouter {
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

            res.send(new HttpResponseEntity({
                error: false,
                message: "Succes",
                data: news

            }))

        } catch (error) {

            if (error instanceof RepositoryError) {
                res.status(500).send(new HttpResponseEntity({
                    error: true,
                    message: "Database error",
                }))
            }

            res.status(500).send(new HttpResponseEntity({
                error: true,
                message: "Unknown error",
            }))
        }
    }

    public getOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const news = await this.newsService.getOne(Number(id))

            res.send(new HttpResponseEntity({
                error: false,
                message: "Succes",
                data: news

            }))

        } catch (error) {

            if (error instanceof RepositoryError) {
                res.status(500).send(new HttpResponseEntity({
                    error: true,
                    message: "Database error",
                }))
            }

            res.status(500).send(new HttpResponseEntity({
                error: true,
                message: "Unknown error",
            }))
        }

    }

    public create = async (req: Request, res: Response) => {
        try {
            console.log(req.session)
            console.log(req.sessionID)
            const { header, description, authorId } = req.body as INewsCreateBody

            const createdNews = await this.newsService.create({ author: authorId, header, description })

            res.status(201).send(new HttpResponseEntity({
                error: false,
                message: "Successfully created",
                data: createdNews

            }))
        } catch (error) {

            if (error instanceof RepositoryError) {
                res.status(500).send(new HttpResponseEntity({
                    error: true,
                    message: "Database error",
                }))
            }

            res.status(500).send(new HttpResponseEntity({
                error: true,
                message: "Unknown error",
            }))
        }
    }

    public update = async (req: Request, res: Response) => {
        try {
            console.log(req.session)

            const { header, description, id } = req.body as UpdateQuery

            const news = await this.newsService.update(id, { header, description } as UpdateBody)

            res.status(200).send(new HttpResponseEntity({
                error: false,
                message: "Successfully updated",
                data: news

            }))
        } catch (error) {

            if (error instanceof RepositoryError) {
                res.status(500).send(new HttpResponseEntity({
                    error: true,
                    message: "Database error",
                }))
            }

            res.status(500).send(new HttpResponseEntity({
                error: true,
                message: "Unknown error",
            }))
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            console.log(req.session)
            const { id } = req.params

            await this.newsService.delete(Number(id))

            res.status(200).send(new HttpResponseEntity({
                error: false,
                message: "Successfully deleted",

            }))
        } catch (error) {
            if (error instanceof RepositoryError) {
                res.status(500).send(new HttpResponseEntity({
                    error: true,
                    message: "Database error",
                }))
            }

            res.status(500).send(new HttpResponseEntity({
                error: true,
                message: "Unknown error",
            }))
        }
    }

    public middlewares() {
        this.router.use(logRequest('News.router'))

        // this.router.use(checkUserLogin, this.create)
        // this.router.use(checkUserLogin, this.update)
        // this.router.use(checkUserLogin, this.delete)
    }

    /* 
    curl --header "Content-Type: application/jon" --request POST --data '{"header":"qq", "description":"meow","authorId":1}' http://localhost:3001/api/news/create

    */

    public routes() {
        this.router.post('/create', checkUserLogin, this.create)
        this.router.get('/:id', this.getOne) //news vs /news/
        this.router.get('/', this.get) // /news vs /news/
        this.router.put('/update', checkUserLogin, this.update)
        this.router.delete('/delete/:id', checkUserLogin, this.delete)
    }

}


export default NewsRouter