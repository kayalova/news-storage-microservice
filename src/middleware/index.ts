import { Request, Response, NextFunction } from 'express'
import { HttpResponseEntity } from '../entities'
import { AuthRequest } from '../models'

export function logRequest(routerName: string) {
    return (req: Request, _: Response, next: NextFunction) => {
        console.log(`${routerName}.${req.method} request`)
        next()
    }
}

export function checkUserLogin(req: AuthRequest, res: Response, next: NextFunction) {

    if (!req.session?.email) {
        res.send(
            new HttpResponseEntity({
                error: true,
                message: "You have to be authorized to make request. Can not find user email"
            }).getBody())
        return
    }
    next()
}