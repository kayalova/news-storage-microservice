import { Router, Request, Response } from 'express'

import { HttpResponseEntity, RepositoryError } from '../entities';
import * as middleware from '../middleware';
import {
    UpdateBody,
    UpdateQuery,
    INewsGetQuery,
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
            } = req.query as INewsGetQuery

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
                }).getBody())
            }

            res.status(500).send(new HttpResponseEntity({
                error: true,
                message: "Unknown error",
            }).getBody())
        }
    }

    public update = async (req: Request, res: Response) => {
        try {
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
                }).getBody())
            }

            res.status(500).send(new HttpResponseEntity({
                error: true,
                message: "Unknown error",
            }))
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {

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
                    message: error.message,
                }).getBody())
            }

            res.status(500).send(new HttpResponseEntity({
                error: true,
                message: "Unknown error",
            }).getBody())
        }
    }

    public middlewares() {
        this.router.use(middleware.logRequest('News.router'))
    }

    public routes() {
        this.router.get('/', this.get)

        this.router.get(
            '/:id',
            middleware.validateParamsId,
            this.getOne
        )

        this.router.post(
            '/create',
            middleware.checkUserLogin,
            middleware.validateNewsCreate,
            this.create
        )

        this.router.put(
            '/update',
            middleware.checkUserLogin,
            this.update
        )

        this.router.delete(
            '/delete/:id',
            middleware.checkUserLogin,
            middleware.validateParamsId,
            this.delete
        )
    }
}


export default NewsRouter