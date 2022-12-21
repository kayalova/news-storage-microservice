import { Router, Request, Response, NextFunction } from 'express'

import { HttpResponseEntity, RepositoryError, ServiceError } from '../entities';
import { logRequest } from '../middleware';
import { ILoginBody } from '../models';
import { AuthService } from '../services'
import * as middleware from '../middleware'

class AuthRouter {
    public router: Router;
    public authService: AuthService;


    constructor(authService: AuthService) {
        this.authService = authService
        this.router = Router()
        this.middlewares()
        this.routes()
    }

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body as ILoginBody
            const loginData = await this.authService.login({ email, password })

            const sess = req.session
            //@ts-ignore
            sess.email = loginData.key
            //@ts-ignore
            sess.password = loginData.value

            res.send(new HttpResponseEntity({
                error: false,
                message: "You are successfully authorized",
            }))

            res.end("success")

        } catch (error: any) {
            if (error instanceof ServiceError) {
                res.status(403).send(new HttpResponseEntity({
                    error: true,
                    message: error.message,
                }).getBody())
            }

            if (error instanceof RepositoryError) {
                res.status(500).send(new HttpResponseEntity({
                    error: true,
                    message: "Database error",
                }).getBody())
            }
        }
    }


    public middlewares() {
        this.router.use(logRequest('Auth.router'))
    }

    public routes() {
        this.router.post(
            '/login',
            middleware.validateAuthLogin,
            this.login
        )
    }

}

export default AuthRouter