import { Router, Request, Response, NextFunction } from 'express'
import UserService from '../services/user.service'

export default class UserRouter {
    public router: Router;
    public userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService

        this.router = Router()
        this.routes()
    }

    create = async () => {
        this.userService.create()
    }

    public routes() {
        this.router.get('/create', this.create) // убрать гет, заменить на пост
    }

}