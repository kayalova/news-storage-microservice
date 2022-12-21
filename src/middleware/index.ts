import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

import { HttpResponseEntity } from '../entities'
import { AuthRequest } from '../models'
import { expressValidatorErrorToObject } from '../utils'

export function logRequest(routerName: string) {
    return (req: Request, _: Response, next: NextFunction) => {
        console.log(`${routerName}.${req.method} request`)

        next()
    }
}

export const checkUserLogin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.session?.email) {
        res.send(
            new HttpResponseEntity({
                error: true,
                message: "You have to be authorized to make request"
            }).getBody())
        return
    }

    next()
}


export const validateParamsId = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.params.id || isNaN(parseInt(req.params.id))) {
        res.send(
            new HttpResponseEntity({
                error: true,
                message: "Please provide news id. It has to be a number"
            }).getBody())
        return
    }

    next()
}

export const validateNewsCreate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    await body('header')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide header, it has to be non-empty')
        .run(req)

    await body('description')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide description, it has to be non-empty')
        .run(req)

    await body('authorId')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Please provide authorId, it has to be non-empty')
        .run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const errorMap = expressValidatorErrorToObject(errors.array())

        res.send(new HttpResponseEntity({
            error: true,
            message: "Some fields are invalid",
            data: errorMap
        }).getBody())

        return
    }

    next()
}

export const validateAuthLogin = async (req: Request, res: Response, next: NextFunction) => {
    await body('email')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide email, it has to be non-empty')
        .run(req)

    await body('password')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide password, it has to be non-empty')
        .run(req)

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMap = expressValidatorErrorToObject(errors.array())

        res.send(new HttpResponseEntity({
            error: true,
            message: 'Some fields are invalid',
            data: errorMap
        }).getBody())

        return
    }

    next()
}

export const validateUserCreate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    await body('firstName')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide firstName, it has to be non-empty')
        .run(req)

    await body('lastName')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide lastName, it has to be non-empty')
        .run(req)

    await body('email')
        .isEmail()
        .withMessage('Please provide value with the following format: adam@jaffar.com')
        .run(req)

    await body('password')
        .exists({ checkNull: true, checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('The value has to be at least 5 chars long')
        .run(req)

    await body('role')
        .equals('author')
        .withMessage('Correct value is author')
        .run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const errorMap = expressValidatorErrorToObject(errors.array())

        res.send(new HttpResponseEntity({
            error: true,
            message: "Some fields are invalid",
            data: errorMap
        }).getBody())

        return
    }

    next()
}
