import { Router, Request, Response, NextFunction } from 'express'

import { logRequest } from '../middleware';
import { ILoginBody } from '../models';
import { AuthService } from '../services'

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
        // add try catch
        const { email, password } = req.body as ILoginBody
        const loginData = await this.authService.login({ email, password })

        const sess = req.session
        //@ts-ignore
        sess.user = loginData.key

        //@ts-ignore
        sess.password = loginData.value // todo: hash
        console.log(sess)
        res.end("success")
    }

    public middlewares() {
        this.router.use(logRequest('Auth.router'))
    }

    public routes() {
        this.router.post('/login', this.login)
    }

}

export default AuthRouter