import { Router, Request, Response } from 'express'
import { HttpResponseEntity, RepositoryError } from '../entities';

import { logRequest } from '../middleware';
import { ICreateUserBody } from '../models';
import { UserService } from '../services'

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
            } = req.body as ICreateUserBody


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
        this.router.use(logRequest('User.router'))
    }

    public routes() {
        this.router.post('/create', this.create)
    }

}

export default UserRouter