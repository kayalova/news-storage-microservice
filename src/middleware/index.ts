import { Request, Response, NextFunction } from 'express'

export function logRequest(routerName: string) {
    return (req: Request, _: Response, next: NextFunction) => {
        console.log(`${routerName}.${req.method} request`)
        next()
    }
}