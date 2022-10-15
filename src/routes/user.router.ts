import { Router, Request, Response, NextFunction } from 'express'
import { logRequest } from '../middleware';
import { ICreateUserBody } from '../models';
import UserService from '../services/user.service'

export default class UserRouter {
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

            await this.userService.create({ firstName, lastName, email, password, role })

            res.status(201).send({
                message: "Successfully created"
            })

        } catch (error) {
            res.send({
                error: "Create user error",
                message: error
            })
        }
    }

    public middlewares() {
        this.router.use(logRequest('User.router'))
    }

    public routes() {
        this.router.post('/create', this.create)
    }

}