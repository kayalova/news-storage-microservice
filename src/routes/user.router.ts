import { Router, Request, Response } from 'express'

import * as middleware from '../middleware';
import { UserService } from '../services'
import { IUserCreateBody } from '../models';
import { HttpResponseEntity, RepositoryError } from '../entities';

class UserRouter {
    public router: Router;
    public userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService

        this.router = Router()
        this.middlewares()
        this.routes()
    }

    create = async (req: Request, res: Response) => {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                role
            } = req.body as IUserCreateBody

            const createdNews = await this.userService.create({ firstName, lastName, email, password, role })

            res.status(201).send(new HttpResponseEntity({
                error: false,
                message: "User was successfully created",
                data: createdNews
            }).getBody())

        } catch (error) {
            if (error instanceof RepositoryError) {

                res.status(500).send(new HttpResponseEntity({
                    error: true,
                    message: error.message,
                }).getBody())
            }
        }
    }

    public middlewares() {
        this.router.use(middleware.logRequest('User.router'))
    }

    public routes() {
        this.router.post(
            '/create',
            middleware.validateUserCreate,
            this.create
        )
    }

}

export default UserRouter